import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  CheckCircle,
  Clock,
  Trash2,
  AlertCircle,
  Wifi,
  WifiOff,
  ChevronDown,
  Sparkles,
  Paperclip,
  Image as ImageIcon,
  FileText,
  Download,
  ExternalLink,
} from 'lucide-react';
import { websocketService } from '../../services/websocketService';

export const ChatDrawer = ({ isOpen, onClose, currentUser, initialConversationId = null }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [wsStatus, setWsStatus] = useState('OFFLINE');
  const [typingUsers, setTypingUsers] = useState(new Map());
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasNewMessageBelow, setHasNewMessageBelow] = useState(false);

  // Attachment Staging & Upload States
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  // 1. WebSocket Status & Initialization
  useEffect(() => {
    if (!isOpen) return;

    const token = localStorage.getItem('token');
    if (token) {
      websocketService.connect(token);
    }

    const unsubStatus = websocketService.onStatusChange((status) => {
      setWsStatus(status);
    });

    fetchConversations();
    fetchTotalUnread();

    return () => {
      unsubStatus();
    };
  }, [isOpen]);

  // 2. Active Conversation STOMP Subscriptions
  useEffect(() => {
    if (!activeConversation || !isOpen) return;

    const convId = activeConversation.id;

    // Fetch initial REST message history
    fetchMessageHistory(convId);
    websocketService.sendReadReceipt(convId);

    // Subscribe to STOMP Real-Time Messages
    const unsubMessages = websocketService.subscribe(
      `/topic/conversations/${convId}`,
      (newMsg) => {
        setMessages((prev) => {
          const existingIdx = prev.findIndex(
            (m) =>
              (newMsg.clientMessageId && m.clientMessageId === newMsg.clientMessageId) ||
              m.id === newMsg.id
          );

          if (existingIdx >= 0) {
            const copy = [...prev];
            copy[existingIdx] = { ...newMsg, status: 'SENT' };
            return copy;
          }
          return [...prev, { ...newMsg, status: 'SENT' }];
        });

        if (chatContainerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
          const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
          if (isAtBottom) {
            scrollToBottom();
          } else {
            setHasNewMessageBelow(true);
          }
        }
      }
    );

    // Subscribe to STOMP Real-Time Typing Events
    const unsubTyping = websocketService.subscribe(
      `/topic/conversations/${convId}/typing`,
      (event) => {
        if (event.userId !== currentUser?.id) {
          setTypingUsers((prev) => {
            const copy = new Map(prev);
            if (event.typing) {
              copy.set(event.userId, event.displayName);
            } else {
              copy.delete(event.userId);
            }
            return copy;
          });
        }
      }
    );

    // Subscribe to STOMP Real-Time Read Receipts
    const unsubRead = websocketService.subscribe(
      `/topic/conversations/${convId}/read`,
      (event) => {
        if (event.userId !== currentUser?.id) {
          fetchMessageHistory(convId);
        }
      }
    );

    return () => {
      unsubMessages();
      unsubTyping();
      unsubRead();
    };
  }, [activeConversation, isOpen]);

  // REST API Helpers
  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/conversations?page=0&size=20', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const list = data.data?.content || [];
        setConversations(list);
        if (initialConversationId) {
          const target = list.find((c) => c.id === initialConversationId);
          if (target) setActiveConversation(target);
        } else if (list.length > 0 && !activeConversation) {
          setActiveConversation(list[0]);
        }
      }
    } catch (e) {
      console.error('Failed to fetch conversations:', e);
    }
  };

  const fetchTotalUnread = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/conversations/unread-count', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.data?.count || 0);
      }
    } catch (e) {
      console.error('Failed to fetch unread count:', e);
    }
  };

  const fetchMessageHistory = async (convId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/conversations/${convId}/messages?page=0&size=50`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const list = (data.data?.content || []).map((m) => ({ ...m, status: 'SENT' }));
        setMessages(list);
        setTimeout(scrollToBottom, 50);
      }
    } catch (e) {
      console.error('Failed to fetch message history:', e);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setHasNewMessageBelow(false);
  };

  // User Typing Handler
  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);

    if (activeConversation) {
      websocketService.sendTyping(activeConversation.id, true);

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        websocketService.sendTyping(activeConversation.id, false);
      }, 3000);
    }
  };

  // File Selection Handler
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (files.length + selectedFiles.length > 5) {
      setUploadError('Maximum 5 attachments allowed per message');
      return;
    }

    setUploadError(null);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Secure Authenticated File Download Helper
  const handleDownloadAttachment = async (attId, fileName) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/attachments/${attId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Access denied or file not found');
      }
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  // Send Message / Attachment Handler
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!inputText.trim() && selectedFiles.length === 0) || !activeConversation) return;

    const content = inputText.trim();
    const clientMessageId = `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    websocketService.sendTyping(activeConversation.id, false);

    // If attachments are staged, use multipart file upload API
    if (selectedFiles.length > 0) {
      setUploading(true);
      setUploadProgress(20);
      setUploadError(null);

      const formData = new FormData();
      if (content) formData.append('content', content);
      formData.append('clientMessageId', clientMessageId);
      selectedFiles.forEach((file) => formData.append('files', file));

      try {
        setUploadProgress(50);
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/conversations/${activeConversation.id}/attachments`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        setUploadProgress(90);

        if (res.ok) {
          const data = await res.json();
          const confirmed = { ...data.data, status: 'SENT' };
          setMessages((prev) => [...prev, confirmed]);
          setInputText('');
          setSelectedFiles([]);
          setUploadProgress(100);
          setTimeout(scrollToBottom, 20);
        } else {
          const errData = await res.json().catch(() => ({}));
          setUploadError(errData.message || 'File upload failed. Please try again.');
        }
      } catch (err) {
        setUploadError('Failed to upload file. Check network connection.');
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }

      return;
    }

    // Pure Text Message Send
    setInputText('');

    const tempMsg = {
      id: clientMessageId,
      clientMessageId,
      conversationId: activeConversation.id,
      senderId: currentUser?.id || 0,
      senderName: currentUser?.fullName || 'Me',
      senderRole: currentUser?.role || 'FARMER',
      content,
      messageType: 'TEXT',
      attachments: [],
      createdAt: new Date().toISOString(),
      deleted: false,
      status: 'SENDING',
    };

    setMessages((prev) => [...prev, tempMsg]);
    setTimeout(scrollToBottom, 20);

    const sentViaWs = websocketService.sendMessage(`/app/chat/${activeConversation.id}`, {
      content,
      clientMessageId,
    });

    if (!sentViaWs) {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/conversations/${activeConversation.id}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content, clientMessageId }),
        });

        if (res.ok) {
          const data = await res.json();
          const confirmed = data.data;
          setMessages((prev) =>
            prev.map((m) =>
              m.clientMessageId === clientMessageId ? { ...confirmed, status: 'SENT' } : m
            )
          );
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.clientMessageId === clientMessageId ? { ...m, status: 'FAILED' } : m
            )
          );
        }
      } catch (err) {
        setMessages((prev) =>
          prev.map((m) =>
            m.clientMessageId === clientMessageId ? { ...m, status: 'FAILED' } : m
          )
        );
      }
    }
  };

  const handleDeleteMessage = async (msgId) => {
    if (!activeConversation) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `/api/conversations/${activeConversation.id}/messages/${msgId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => prev.map((m) => (m.id === msgId ? data.data : m)));
      }
    } catch (e) {
      console.error('Failed to delete message:', e);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  const typingDisplayNames = Array.from(typingUsers.values()).join(', ');

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[520px] bg-forest-950/95 border-l border-white/10 backdrop-blur-3xl shadow-2xl flex flex-col transition-all duration-300">
      {/* Drawer Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-forest-900/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-white font-display">Kṣetravya Chat</h3>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  wsStatus === 'CONNECTED'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : wsStatus === 'RECONNECTING'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {wsStatus === 'CONNECTED' ? (
                  <Wifi className="w-3 h-3 text-emerald-400" />
                ) : (
                  <WifiOff className="w-3 h-3 text-rose-400" />
                )}
                <span>{wsStatus}</span>
              </span>
            </div>
            <p className="text-[11px] text-cream-200/60 font-mono">
              Secure conversations for farmers and workers
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl text-cream-200/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Chat Body */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Conversation Bar */}
        <div className="px-4 py-2 bg-forest-900/40 border-b border-white/5 flex items-center justify-between">
          <span className="text-xs text-cream-200/70 font-mono truncate max-w-[320px]">
            {activeConversation?.jobTitle ? `Job: ${activeConversation.jobTitle}` : 'Conversations'}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold">
            {conversations.length} Active
          </span>
        </div>

        {/* Messages List Container */}
        <div
          ref={chatContainerRef}
          className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-cream-200/50">
              <Sparkles className="w-8 h-8 mb-2 text-emerald-400/50" />
              <p className="text-sm font-medium text-white">No messages yet</p>
              <p className="text-xs mt-1">
                Share crop photos, field reports, and PDFs securely.
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMine = msg.senderId === currentUser?.id;
              const hasAttachments = msg.attachments && msg.attachments.length > 0;

              return (
                <div
                  key={msg.id || msg.clientMessageId}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                      isMine
                        ? 'bg-emerald-600/90 text-white border-emerald-400/30 rounded-br-none shadow-lg shadow-emerald-950/40'
                        : 'bg-forest-900/80 text-cream-100 border-white/10 rounded-bl-none shadow-lg'
                    } ${msg.deleted ? 'italic opacity-60' : ''}`}
                  >
                    {!isMine && (
                      <span className="block text-[10px] font-bold text-emerald-400 font-mono mb-1.5">
                        {msg.senderName} ({msg.senderRole})
                      </span>
                    )}

                    {/* Text Content */}
                    {msg.content && <p className="break-words mb-2">{msg.content}</p>}

                    {/* Attachment Rendering */}
                    {hasAttachments && !msg.deleted && (
                      <div className="space-y-2 mt-1">
                        {msg.attachments.map((att) => {
                          const isImg = att.contentType && att.contentType.startsWith('image/');

                          if (isImg) {
                            return (
                              <div key={att.id} className="relative group overflow-hidden rounded-xl border border-white/20">
                                <img
                                  src={att.downloadUrl}
                                  alt={att.fileName}
                                  className="max-h-56 w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                                  onError={(e) => {
                                    // Fallback for non-session images
                                    e.target.onerror = null;
                                    e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600';
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => handleDownloadAttachment(att.id, att.fileName)}
                                    className="p-2 rounded-full bg-forest-950/80 text-white hover:bg-emerald-500 hover:text-stone-950 transition-colors shadow-lg"
                                    title="Download Image"
                                  >
                                    <Download className="w-4 h-4" />
                                  </button>
                                </div>
                                <span className="absolute bottom-1 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-white">
                                  {formatFileSize(att.fileSize)}
                                </span>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={att.id}
                              className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-forest-950/70 border border-white/10 hover:border-emerald-400/50 transition-colors"
                            >
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div className="truncate">
                                  <span className="block text-xs font-mono font-bold text-white truncate">
                                    📄 {att.fileName}
                                  </span>
                                  <span className="text-[10px] text-cream-200/60 font-mono">
                                    {formatFileSize(att.fileSize)}
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => handleDownloadAttachment(att.id, att.fileName)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-stone-950 text-xs font-mono font-bold transition-colors flex items-center gap-1 shrink-0"
                              >
                                <Download className="w-3 h-3" />
                                <span>Open</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Footer Timestamps */}
                    <div className="flex items-center justify-end gap-1.5 mt-2 text-[9px] text-cream-200/50 font-mono">
                      <span>
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : ''}
                      </span>

                      {isMine && !msg.deleted && (
                        <span>
                          {msg.status === 'SENDING' ? (
                            <Clock className="w-2.5 h-2.5 text-amber-300 animate-spin" />
                          ) : msg.status === 'FAILED' ? (
                            <AlertCircle className="w-2.5 h-2.5 text-rose-400" />
                          ) : (
                            <CheckCircle className="w-2.5 h-2.5 text-emerald-300" />
                          )}
                        </span>
                      )}

                      {isMine && !msg.deleted && msg.status !== 'SENDING' && (
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="ml-1 text-cream-200/40 hover:text-rose-400 transition-colors"
                          title="Delete Message"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Typing Indicator */}
          {typingDisplayNames && (
            <div className="flex items-center gap-2 text-xs text-amber-300 font-mono italic animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{typingDisplayNames} is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Staged File Previews Bar */}
        {selectedFiles.length > 0 && (
          <div className="p-3 bg-forest-900/90 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-cream-200/70 font-mono mb-2">
              <span>Staged Attachments ({selectedFiles.length}/5)</span>
              <button
                onClick={() => setSelectedFiles([])}
                className="text-rose-400 hover:underline"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-forest-950 border border-emerald-500/40 text-xs text-emerald-300 font-mono"
                >
                  <span className="truncate max-w-[140px]">{file.name}</span>
                  <button
                    onClick={() => removeSelectedFile(idx)}
                    className="text-cream-200/50 hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Progress Indicator */}
        {uploading && (
          <div className="px-4 py-1.5 bg-emerald-950/60 border-t border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-300">
            <span>Uploading attachment... {uploadProgress}%</span>
            <div className="w-24 h-1.5 rounded-full bg-forest-900 overflow-hidden">
              <div
                className="h-full bg-emerald-400 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload Error Banner */}
        {uploadError && (
          <div className="px-4 py-2 bg-rose-950/80 border-t border-rose-500/40 text-xs font-mono text-rose-300 flex items-center justify-between">
            <span>{uploadError}</span>
            <button onClick={() => setUploadError(null)} className="text-white hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Floating New Message Banner */}
        {hasNewMessageBelow && (
          <button
            onClick={scrollToBottom}
            className="mx-auto mb-2 px-3 py-1 rounded-full bg-emerald-500 text-forest-950 text-xs font-mono font-bold shadow-lg flex items-center gap-1.5 animate-bounce"
          >
            <ChevronDown className="w-3.5 h-3.5" />
            <span>New Message Below</span>
          </button>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="image/jpeg,image/png,image/webp,application/pdf,text/plain"
          className="hidden"
        />

        {/* Message Input Composer Form */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-forest-900/90 flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/15 text-cream-200/80 hover:text-white transition-colors border border-white/10"
            title="Attach Crop Photo or Document (Max 5 files)"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder={
              selectedFiles.length > 0
                ? 'Add an optional caption...'
                : 'Type your message...'
            }
            className="flex-1 bg-forest-950/80 border border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-cream-200/40 focus:outline-none focus:border-emerald-400/60 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim() && selectedFiles.length === 0}
            className="p-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-forest-950 font-bold transition-all shadow-lg shadow-emerald-950/50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
