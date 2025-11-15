import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

export function startPingServer() {
  const server = express();
  let pingId = 1;

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Ping server is listening on: http://localhost:${PORT}`);
  });

  setInterval(async () => {
    try {
      await fetch('https://dzieci-neo-gzr5.onrender.com');
      console.log(`Ping: ${pingId++}`);
      if (pingId >= 10) {
        pingId = 1;
      }
    } catch (error) {
      console.error('Error pinging server:', error);
    }
  }, 20_000);
}
