import { ProxyAgent } from 'undici';

const PROXY_USER = process.env.PROXY_USER ?? '';
const PROXY_PASS = process.env.PROXY_PASS ?? '';
const PROXY_HOST = process.env.PROXY_HOST ?? '';
const PROXY_PORT = process.env.PROXY_PORT ?? '';

class ProxyManager {
  private proxyUrl?: string;
  private agent?: any;
  private enabled: boolean;

  constructor(user?: string, pass?: string, host?: string, port?: string) {
    this.enabled = !!(user && pass && host && port);
    if (!this.enabled) {
      this.proxyUrl = undefined;
      this.agent = undefined;
      console.warn('ProxyManager: proxy disabled because PROXY_USER/PROXY_PASS/PROXY_HOST/PROXY_PORT are not set.');
      return;
    }

    this.proxyUrl = `http://${encodeURIComponent(user!)}:${encodeURIComponent(pass!)}@${host}:${port}`;
    this.createAgent();
  }

  private createAgent() {
    if (!this.proxyUrl) return;
    try {
      this.agent = new ProxyAgent(this.proxyUrl);
      console.info('ProxyManager: proxy agent initialized');
    } catch (err) {
      console.error('Failed creating proxy agent', err);
      this.agent = undefined;
    }
  }

  getAgent() {
    if (!this.enabled) return undefined;
    if (!this.agent) this.createAgent();
    return this.agent;
  }
}

export default new ProxyManager(PROXY_USER, PROXY_PASS, PROXY_HOST, PROXY_PORT);
