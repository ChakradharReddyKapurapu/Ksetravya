/**
 * Utility to reliably detect WebGL 1 & WebGL 2 capability in browser
 */
export function checkWebGLSupport() {
  if (typeof window === 'undefined') return { supported: true, version: 2, renderer: 'SSR' };
  
  try {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');
    if (gl2) {
      const debugInfo = gl2.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo ? gl2.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Generic WebGL2';
      return { supported: true, version: 2, renderer };
    }

    const gl1 = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl1) {
      const debugInfo = gl1.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo ? gl1.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Generic WebGL1';
      return { supported: true, version: 1, renderer };
    }

    return { supported: false, version: 0, renderer: 'None' };
  } catch (e) {
    return { supported: false, version: 0, renderer: 'Error: ' + e.message };
  }
}
