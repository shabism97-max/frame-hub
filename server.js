import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;
const distPath = path.join(__dirname, 'dist');

// Serve static assets with appropriate caching
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true
  }));
}

// Health check endpoint for Cloud Run and container probes
app.get('/healthz', (_req, res) => {
  res.status(200).send('OK');
});

// SPA fallback: return index.html for any other request
app.get('*', (_req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('Application build in progress. Please refresh in a moment.');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Frame Hub production server running on port ${port}`);
});
