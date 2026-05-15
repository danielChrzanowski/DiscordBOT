import { ProxyAgent } from 'undici';

// Default proxy list can be overridden via env PROXY_LIST (comma-separated)
const DEFAULT_PROXY_LIST = [
  '142.111.48.253:7030',
  '23.95.150.145:6114',
  '45.38.107.97:6014',
  '38.154.203.95:5863',
  '198.23.243.226:6361',
  '84.247.60.125:6095',
  '104.239.107.47:5699',
  '23.27.208.120:5830',
  '23.229.19.94:8689',
  '2.57.20.2:6983',
];
const PROXY_LIST = process.env.PROXY_LIST ? process.env.PROXY_LIST.split(',').map((s) => s.trim()) : DEFAULT_PROXY_LIST;

const PROXY_USER = process.env.PROXY_USER ?? '';
const PROXY_PASS = process.env.PROXY_PASS ?? '';

class ProxyManager {
  private proxies: string[];
  private index: number;
  private enabled: boolean;

  constructor(list: string[], user?: string, pass?: string) {
    this.index = 0;
    this.enabled = !!(user && pass);
    if (!this.enabled) {
      this.proxies = [];
      console.warn('ProxyManager: proxy disabled because PROXY_USER/PROXY_PASS are not set.');
      return;
    }

    this.proxies = list.map((p) => `http://${encodeURIComponent(user!)}:${encodeURIComponent(pass!)}@${p}`);
  }

  get current() {
    if (!this.enabled || this.proxies.length === 0) return undefined;
    return this.proxies[this.index];
  }

  getAgent() {
    if (!this.enabled || !this.current) return undefined;
    try {
      return new ProxyAgent(this.current);
    } catch (err) {
      console.error('Failed creating proxy agent', err);
      return undefined;
    }
  }

  rotate() {
    if (!this.enabled || this.proxies.length === 0) {
      console.warn('ProxyManager.rotate called but proxy manager is disabled.');
      return undefined;
    }
    this.index = (this.index + 1) % this.proxies.length;
    console.warn(`Proxy rotated to: ${this.current}`);
    return this.getAgent();
  }

  async runWithRetry<T>(action: (agent?: any) => Promise<T>, attempts = this.proxies.length): Promise<T> {
    if (!this.enabled || this.proxies.length === 0) {
      // No proxy configured; run action directly
      return action(undefined);
    }

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
