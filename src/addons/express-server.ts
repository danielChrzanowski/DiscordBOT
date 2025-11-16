import express from 'express';

// Express server for OnRender hosting service scanning.
export const initExpressServer = () => {
  const server = express();

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Express server is listening on: http://localhost:${PORT}`);
  });
};
