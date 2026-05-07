declare global {
  interface Window {
    __env?: {
      API_URL?: string;
    };
  }
}

const fallbackApiUrl = 'http://localhost:3000/api';

export const appConfig = {
  apiBaseUrl: window.__env?.API_URL || fallbackApiUrl,
};
