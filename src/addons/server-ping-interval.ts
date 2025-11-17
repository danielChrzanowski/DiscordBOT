export const initServerPingInterval = () => {
  const expressPort = process.env.EXPRESS_PORT || 3000;
  const serverPingUrl = process.env.SERVER_PING_URL || `http://localhost:${expressPort}/dummy`;

  console.log(`Started pinging: ${serverPingUrl}`);

  setInterval(() => {
    fetch(serverPingUrl)
      .then((res) => res.json())
      .then((data) => console.log(`GET /dummy:`, data))
      .catch((err) => console.error(`Error fetching /dummy:`, err));
  }, 2_000);
};
