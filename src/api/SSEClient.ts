import { firebase } from '@react-native-firebase/auth';

export interface SSEOptions<T> extends RequestInit {
  method?: string;
  onMessage?: (data: T) => void;
  onError?: (error: unknown) => void;
  onClose?: () => void;
}

export class SSEClient<T> {
  private url: string;
  private headers: Record<string, string>;
  private xhr: XMLHttpRequest;
  private method: string;
  private body: unknown;

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
    this.setupEventListeners(options);
  }

  private async setupEventListeners(options: SSEOptions<T>) {
    this.xhr.onreadystatechange = () => {
      if (this.xhr.readyState === this.xhr.LOADING) {
        const lines = this.xhr.responseText.split('\n');
        lines.forEach((line) => {
          if (line.startsWith('data:')) {
            const data = JSON.parse(line.slice(5).trim()) as T;
            options.onMessage && options.onMessage(data);
          }
        });
      }
    };

    this.xhr.onerror = () => {
      options.onError && options.onError(this.xhr.statusText);
      this.xhr.abort();
      options.onClose && options.onClose();
    };
  }

  public async connect() {
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

  public close() {
    this.xhr.abort();
  }
}
