import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectMongoose from '../src/utils/mongo.js';
import ConceptRouter from '../src/routes/concept.router.js';
import BookRouter from '../src/routes/book.router.js';
import AdminRouter from '../src/routes/admin.router.js';
import { admin_check } from '../src/middleware/admin_check.js';
import cacheFor24Hours from '../src/middleware/cache.js';


// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB
connectMongoose();


// Connect router to admin endpoint
app.use('/admin', admin_check, AdminRouter);

// Connect router to concepts endpoint
app.use('/concepts', cacheFor24Hours,ConceptRouter);

app.use('/books', cacheFor24Hours, BookRouter)

export default app
