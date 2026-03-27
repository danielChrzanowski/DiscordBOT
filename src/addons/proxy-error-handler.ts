export default function attachProxyErrorHandlers(client: any, proxyManager: any): void {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    try {
      const agent = proxyManager.rotate();
      if ((client as any).rest) {
        try {
          (client as any).rest.agent = agent;
        } catch (_e) {
          try {
            const RestCtor = (client as any).rest?.constructor;
            if (RestCtor) {
              (client as any).rest = new RestCtor({ version: '10', agent }).setToken(process.env.DISCORD_TOKEN);
            }
          } catch (err) {
            console.error('Failed to update client.rest agent', err);
          }
        }
      }
    } catch (err) {
      console.error('Failed rotating proxy after unhandledRejection', err);
    }
  });

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    try {
      proxyManager.rotate();
    } catch (e) {
      console.error('Failed rotating proxy after uncaughtException', e);
    }
  });
}
