/**
 * AGRI NEXUS — REAL-TIME STOMP OVER WEBSOCKET SERVICE (PHASE 14)
 * Handles JWT authentication, STOMP framing, heartbeats, exponential backoff reconnection,
 * conversation subscriptions, typing events, read receipts, and real-time notifications.
 */

class WebSocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.reconnecting = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.baseReconnectDelay = 1000; // 1 second
    this.subscriptions = new Map(); // id -> destination
    this.listeners = new Map(); // destination -> Set<callback>
    this.statusListeners = new Set();
    this.pingInterval = null;
    this.token = null;
    this.baseUrl = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    this.wsHost = window.location.host;
  }

  /**
   * Connect to WebSocket / STOMP broker
   */
  connect(jwtToken) {
    if (this.connected || (this.socket && this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.token = jwtToken || localStorage.getItem('agri_nexus_jwt_token') || localStorage.getItem('token');
    if (!this.token) {
      this._notifyStatus('OFFLINE');
      return;
    }

    const targetApi = import.meta.env.VITE_API_URL || 'https://ksetravya.onrender.com/api';
    const isSecure = targetApi.startsWith('https:');
    const wsScheme = isSecure ? 'wss:' : 'ws:';
    const hostDomain = targetApi.replace(/^https?:\/\//, '').replace(/\/api\/?$/, '');
    const wsUrl = `${wsScheme}//${hostDomain}/ws`;
    this._notifyStatus(this.reconnectAttempts > 0 ? 'RECONNECTING' : 'CONNECTING');

    try {
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        // Send STOMP CONNECT frame with JWT authorization header
        const connectFrame =
          'CONNECT\n' +
          'accept-version:1.2,1.1,1.0\n' +
          'heart-beat:10000,10000\n' +
          `Authorization:Bearer ${this.token}\n` +
          `token:${this.token}\n` +
          '\n\0';

        this.socket.send(connectFrame);
      };

      this.socket.onmessage = (event) => {
        this._handleStompFrame(event.data);
      };

      this.socket.onerror = (err) => {
        console.warn('[AGRI-NEXUS WS] WebSocket error:', err);
      };

      this.socket.onclose = () => {
        this.connected = false;
        this._stopHeartbeat();
        this._notifyStatus('OFFLINE');
        this._scheduleReconnect();
      };
    } catch (e) {
      console.error('[AGRI-NEXUS WS] Connection initialization failed:', e);
      this._scheduleReconnect();
    }
  }

  /**
   * Disconnect STOMP session
   */
  disconnect() {
    this._stopHeartbeat();
    if (this.socket && this.connected) {
      try {
        this.socket.send('DISCONNECT\n\n\0');
        this.socket.close();
      } catch (e) {
        // Ignore disconnect close exceptions
      }
    }
    this.connected = false;
    this.reconnecting = false;
    this.reconnectAttempts = 0;
    this.subscriptions.clear();
    this.listeners.clear();
    this._notifyStatus('OFFLINE');
  }

  /**
   * Subscribe to a STOMP destination
   */
  subscribe(destination, callback) {
    if (!this.listeners.has(destination)) {
      this.listeners.set(destination, new Set());
    }
    this.listeners.get(destination).add(callback);

    if (this.connected) {
      this._sendSubFrame(destination);
    }

    return () => {
      const set = this.listeners.get(destination);
      if (set) {
        set.delete(callback);
        if (set.size === 0) {
          this.listeners.delete(destination);
          if (this.connected) {
            const subId = `sub-${destination}`;
            this.socket.send(`UNSUBSCRIBE\nid:${subId}\n\n\0`);
            this.subscriptions.delete(destination);
          }
        }
      }
    };
  }

  /**
   * Send STOMP message payload to /app destination
   */
  sendMessage(destination, payload) {
    if (!this.connected || !this.socket) {
      console.warn('[AGRI-NEXUS WS] Cannot send message - WebSocket disconnected');
      return false;
    }

    const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
    const sendFrame =
      `SEND\n` +
      `destination:${destination}\n` +
      `content-type:application/json\n` +
      `content-length:${body.length}\n` +
      `\n` +
      `${body}\0`;

    this.socket.send(sendFrame);
    return true;
  }

  /**
   * Send typing status to conversation
   */
  sendTyping(conversationId, isTyping) {
    return this.sendMessage(`/app/chat/${conversationId}/typing`, { typing: isTyping });
  }

  /**
   * Send read receipt event to conversation
   */
  sendReadReceipt(conversationId) {
    return this.sendMessage(`/app/chat/${conversationId}/read`, {});
  }

  /**
   * Register connection status listener (CONNECTED, RECONNECTING, OFFLINE)
   */
  onStatusChange(callback) {
    this.statusListeners.add(callback);
    callback(this.connected ? 'CONNECTED' : this.reconnecting ? 'RECONNECTING' : 'OFFLINE');
    return () => this.statusListeners.delete(callback);
  }

  // --- Internal Methods ---

  _sendSubFrame(destination) {
    if (this.subscriptions.has(destination)) return;
    const subId = `sub-${destination}`;
    const subFrame = `SUBSCRIBE\nid:${subId}\ndestination:${destination}\n\n\0`;
    this.socket.send(subFrame);
    this.subscriptions.set(destination, subId);
  }

  _handleStompFrame(rawData) {
    if (rawData === '\n' || rawData === '\r\n') return; // Heartbeat ping

    const commandEnd = rawData.indexOf('\n');
    if (commandEnd === -1) return;
    const command = rawData.substring(0, commandEnd).trim();

    if (command === 'CONNECTED') {
      this.connected = true;
      this.reconnecting = false;
      this.reconnectAttempts = 0;
      this._notifyStatus('CONNECTED');
      this._startHeartbeat();

      // Resubscribe to active destinations
      for (const destination of this.listeners.keys()) {
        this._sendSubFrame(destination);
      }
    } else if (command === 'MESSAGE') {
      const headerEnd = rawData.indexOf('\n\n');
      if (headerEnd === -1) return;

      const headersRaw = rawData.substring(commandEnd + 1, headerEnd).split('\n');
      const headers = {};
      headersRaw.forEach((line) => {
        const colonIdx = line.indexOf(':');
        if (colonIdx > 0) {
          headers[line.substring(0, colonIdx).trim()] = line.substring(colonIdx + 1).trim();
        }
      });

      let bodyRaw = rawData.substring(headerEnd + 2);
      if (bodyRaw.endsWith('\0')) {
        bodyRaw = bodyRaw.substring(0, bodyRaw.length - 1);
      }

      let parsedBody = bodyRaw;
      try {
        parsedBody = JSON.parse(bodyRaw);
      } catch (e) {
        // Keep raw text
      }

      const dest = headers.destination;
      if (dest && this.listeners.has(dest)) {
        this.listeners.get(dest).forEach((cb) => {
          try {
            cb(parsedBody, headers);
          } catch (err) {
            console.error('[AGRI-NEXUS WS] Error in listener callback:', err);
          }
        });
      }
    }
  }

  _scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.warn('[AGRI-NEXUS WS] Max reconnect attempts reached');
      this._notifyStatus('OFFLINE');
      return;
    }

    this.reconnecting = true;
    this.reconnectAttempts++;
    this._notifyStatus('RECONNECTING');

    const delay = Math.min(30000, this.baseReconnectDelay * Math.pow(2, this.reconnectAttempts - 1));
    setTimeout(() => {
      if (!this.connected) {
        this.connect(this.token);
      }
    }, delay);
  }

  _startHeartbeat() {
    this._stopHeartbeat();
    this.pingInterval = setInterval(() => {
      if (this.socket && this.connected && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send('\n');
      }
    }, 10000);
  }

  _stopHeartbeat() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  _notifyStatus(status) {
    this.statusListeners.forEach((cb) => cb(status));
  }
}

export const websocketService = new WebSocketService();
