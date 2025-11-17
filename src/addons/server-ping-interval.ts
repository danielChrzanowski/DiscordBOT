export const initServerPingInterval = () => {
  const expressPort = process.env.EXPRESS_PORT || 3000;
  const serverPingUrl = process.env.SERVER_PING_URL || `http://localhost:${expressPort}/dummy`;

  console.log(`Started ping server interval on: ${serverPingUrl}`);

  const serverStartingTimeoutTime = 60_000;
  const interval = 2_000;

  const ping = (delay: number) => {
    setTimeout(() => {
      fetch(serverPingUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log(`GET /dummy:`, data);
          ping(interval);
        })
        .catch((err) => {
          console.error(`Error fetching /dummy:`, err);
          ping(serverStartingTimeoutTime);
        });
    }, delay);
  };

  ping(serverStartingTimeoutTime);
};
