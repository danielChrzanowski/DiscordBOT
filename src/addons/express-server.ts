import express from 'express';
import { initServerPingInterval } from './server-ping-interval.js';

// Express server for OnRender hosting service scanning.
export const initExpressServer = () => {
  const server = express();

  // Endpoint API /dummy
  server.get('/dummy', (_req, res) => {
    res.json({ result: 'dummy' });
  });

  const expressPort = process.env.EXPRESS_PORT || 3000;
  server.listen(expressPort, () => {
    console.log(`Express server is listening on: http://localhost:${expressPort}`);
    initServerPingInterval();
  });
};
