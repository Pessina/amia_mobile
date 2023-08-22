import { firebase } from '@react-native-firebase/auth';

export interface SSEOptions<T> extends RequestInit {
  method?: string;
  onOpen?: () => void;
  onMessage?: (event: MessageEvent<T>) => void;
  onError?: (error: Event) => void;
}

export interface MessageEvent<T> {
  data: T;
  type: string;
  lastEventId: string;
}

export class SSEClient<T> {
  private url: string;
  private headers: Record<string, string>;
  private xhr: XMLHttpRequest;
  private method: string;
  private body: unknown;
  private listeners: Record<string, Array<(event: MessageEvent<T>) => void>>;
  private retry: number | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  constructor(url: string, options: SSEOptions<T> = {}) {
    this.url = url;
    this.headers = {
      ...(options.headers as Record<string, string>),
      'Cache-Control': 'no-cache',
      Accept: 'text/event-stream',
    };
    this.method = options.method || 'GET';
    this.body = options.body;
    this.xhr = new XMLHttpRequest();
    this.listeners = {};
    this.setupEventListeners(options);
  }

  private parseResponse(responseText: string, options: SSEOptions<T>) {
    const lines = responseText.split('\n');
    let lastEventId = '';
    let eventType = 'message';
    let eventData = '';
    let retryValue = '';

    lines.forEach((line) => {
      if (line.startsWith('id:')) {
        lastEventId = line.slice(3).trim();
      } else if (line.startsWith('event:')) {
        eventType = line.slice(6).trim();
      } else if (line.startsWith('data:')) {
        eventData += line.slice(5).trim() + '\n';
      } else if (line.startsWith('retry:')) {
        retryValue = line.slice(6).trim();
        const retry = parseInt(retryValue, 10);
        if (!isNaN(retry)) {
          this.retry = retry;
        }
      } else if (line === '' && eventData !== '') {
        try {
          const event: MessageEvent<T> = {
            data: JSON.parse(eventData) as T,
            type: eventType,
            lastEventId: lastEventId,
          };
          this.dispatchEvent(event);
          options.onMessage && options.onMessage(event);
        } catch (e) {
          options.onError && options.onError(new Event('parseerror'));
        }
        eventData = '';
        eventType = 'message';
      }
    });
  }

  private async setupEventListeners(options: SSEOptions<T>) {
    this.xhr.onreadystatechange = () => {
      if (this.xhr.readyState === this.xhr.LOADING) {
        this.parseResponse(this.xhr.responseText, options);
      }
    };

    this.xhr.onerror = () => {
      options.onError && options.onError(new Event('error'));
      this.xhr.abort();
      if (this.retry !== null) {
        this.reconnectTimeout && clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = setTimeout(() => this.connect(), this.retry);
      }
    };

    this.xhr.onload = () => {
      options.onOpen && options.onOpen();
    };

    this.xhr.onabort = () => {
      const event: MessageEvent<T> = {
        data: {} as T,
        type: 'close',
        lastEventId: '',
      };
      options.onMessage && options.onMessage(event);
    };
  }

  private dispatchEvent(event: MessageEvent<T>) {
    const listeners = this.listeners[event.type] || [];
    listeners.forEach((listener) => listener(event));
  }

  public async connect() {
    if (this.xhr.readyState !== this.xhr.OPENED && this.xhr.readyState !== this.xhr.LOADING) {
      const token = firebase.auth().currentUser
        ? await firebase.auth().currentUser?.getIdToken()
        : null;

      this.headers.Authorization = token ? `Bearer ${token}` : '';

      this.xhr.open(this.method, this.url, true);

      Object.entries(this.headers).forEach(([key, value]) => {
        this.xhr.setRequestHeader(key, value);
      });

      this.xhr.send(this.body);
    }
  }

  public close() {
    this.xhr.abort();
    if (this.reconnectTimeout !== null) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  public addEventListener(type: string, listener: (event: MessageEvent<T>) => void) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener);
  }

  public removeEventListener(type: string, listener: (event: MessageEvent<T>) => void) {
    const listeners = this.listeners[type];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }
}
