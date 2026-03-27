export const initServerPingInterval = () => {
  const expressPort = process.env.EXPRESS_PORT || 3000;
  const serverPingUrl = process.env.SERVER_PING_URL || `http://localhost:${expressPort}/dummy`;

  console.log(`Started ping server interval on: ${serverPingUrl}`);

  const serverErrorTimeoutTime = 180_000;
  const interval = process.env.SERVER_PING_INTERVAL ? parseInt(process.env.SERVER_PING_INTERVAL) : 10_000;
  const fetchTimeout = process.env.SERVER_PING_FETCH_TIMEOUT ? parseInt(process.env.SERVER_PING_FETCH_TIMEOUT) : 15_000;
  let consecutiveFailures = 0;
  const maxBackoff = 5 * 60_000;

  const getBackoffDelay = (base: number) => {
    if (consecutiveFailures <= 0) return base;
    return Math.min(base * Math.pow(2, consecutiveFailures - 1), maxBackoff);
  };

  const ping = (delay: number) => {
    setTimeout(async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), fetchTimeout);

        const res = await fetch(serverPingUrl, { signal: controller.signal });
        clearTimeout(timeout);

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          console.warn(`GET /dummy returned ${res.status}:`, text);
          consecutiveFailures++;
          ping(getBackoffDelay(serverErrorTimeoutTime));
          return;
        }

        const text = await res.text().catch(() => '');
        try {
          const data = JSON.parse(text);
          console.log('GET /dummy:', data);
        } catch {
          console.log('GET /dummy (text):', text);
        }
        consecutiveFailures = 0;
        ping(interval);
        return;
      } catch (err: any) {
        if (err?.name === 'AbortError') {
          console.error('Error fetching /dummy: request timed out');
        } else {
          console.error('Error fetching /dummy:', err);
        }
        consecutiveFailures++;
        ping(getBackoffDelay(serverErrorTimeoutTime));
      }
    }, delay);
  };

  ping(serverErrorTimeoutTime);
};
