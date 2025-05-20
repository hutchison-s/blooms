import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());

// Entry function to connect to DB and start server
async function init() {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();
    console.log('Connected to MongoDB');

    const qCol = db.collection('q');
    const blooms = db.collection('blooms');

    // Routes
    app.get('/ping', (req, res) => {
      res.status(200).json({ message: 'pong' });
    });

    app.get('/api/grade/:n', async (req, res) => {
      try {
        const { n } = req.params;
        const docs = await blooms.find({ gradeLevel: parseInt(n) }).sort({ concept: 1 }).toArray();
        res.status(200).json(docs);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
      }
    });

    // Serve static Vue files
    app.use(express.static(path.join(__dirname, 'dist')));

    // Fallback for SPA routing
    app.get('/*path', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('Failed to initialize server:', err);
  }
}

// Start app
init();
