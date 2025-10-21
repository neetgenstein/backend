import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Start server only after DB connection
(async () => {
  try {
    await connectDB();

    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`API server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
