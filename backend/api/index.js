import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectMongoose from '../src/utils/mongo.js';
import ConceptRouter from '../src/routes/concept.router.js';
import BookRouter from '../src/routes/book.router.js';
import AdminRouter from '../src/routes/admin.router.js';
import { admin_check } from '../src/middleware/admin_check.js';
import cacheFor24Hours from '../src/middleware/cache.js';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url); // Get current filename
const __dirname = path.dirname(__filename); // Get current directory name


const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again later.',
});

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
connectMongoose();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/' || '/api-docs', (req, res)=>{
  res.sendFile(path.join(__dirname, '../public', 'api-docs.html'));
});

// Connect router to admin endpoint
app.use('/admin', admin_check, AdminRouter);

// Apply rate limiting to all non-admin requests
app.set('trust proxy', 1);
app.use(limiter);

// Connect router to concepts endpoint
app.use('/concepts', cacheFor24Hours,ConceptRouter);

app.use('/books', cacheFor24Hours, BookRouter)

// app.listen(3000, ()=>{
//   console.log('Server is running on port 3000');
// })

export default app
