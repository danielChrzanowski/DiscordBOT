import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
let fetch: typeof import('node-fetch').default;
let pingId = 1;

(async () => {
    fetch = (await import('node-fetch')).default;
})();

server.use((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ pingId }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

setInterval(async () => {
    if (fetch) {
        await fetch('https://dzieci-neo-gzr5.onrender.com');
        console.log(`Ping: ${pingId}`);
        pingId++;
    }
}, 30000);
