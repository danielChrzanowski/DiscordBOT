import { ProxyAgent } from 'undici';

const PROXY_LIST = ['31.59.20.176:6754', '45.38.107.97:6014', '198.105.121.200:6462', '31.58.9.4:6077'];

const PROXY_USER = process.env.PROXY_USER || 'undefined_user';
const PROXY_PASS = process.env.PROXY_PASS || 'undefined_password';

class ProxyManager {
  private proxies: string[];
  private index: number;

  constructor(list: string[], user: string, pass: string) {
    this.proxies = list.map((p) => `http://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${p}`);
    this.index = 0;
  }

  get current() {
    return this.proxies[this.index];
  }

  getAgent() {
    try {
      return new ProxyAgent(this.current);
    } catch (err) {
      console.error('Failed creating proxy agent', err);
      return undefined;
    }
  }

  rotate() {
    this.index = (this.index + 1) % this.proxies.length;
    console.warn(`Proxy rotated to: ${this.current}`);
    return this.getAgent();
  }

  async runWithRetry<T>(action: (agent?: any) => Promise<T>, attempts = this.proxies.length): Promise<T> {
    let lastErr: any;
    for (let i = 0; i < attempts; i++) {
      const agent = this.getAgent();
      try {
        return await action(agent);
      } catch (err: any) {
        lastErr = err;
        console.error(`Proxy attempt ${i + 1} failed:`, (err as any)?.message || err);
        this.rotate();
      }
    }
    throw lastErr;
  }
}

export default new ProxyManager(PROXY_LIST, PROXY_USER, PROXY_PASS);
