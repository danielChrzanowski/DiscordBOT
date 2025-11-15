export function initServerPingInterval() {
  let pingId = 1;

  console.log(`Started ping server interval.`);

  setInterval(async () => {
    try {
      await fetch('https://dzieci-neo-gzr5.onrender.com');
      console.log(`Server ping: ${pingId++}`);
      if (pingId >= 10) {
        pingId = 1;
      }
    } catch (error) {
      console.error('Error pinging server:', error);
    }
  }, 20_000);
}
