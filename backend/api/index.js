import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import yaml from 'yamljs';
import connectMongoose from '../src/utils/mongo.js';
import ConceptRouter from '../src/routes/concept.router.js';
import BookRouter from '../src/routes/book.router.js';
import AdminRouter from '../src/routes/admin.router.js';
import swaggerUi from 'swagger-ui-express';
import { admin_check } from '../src/middleware/admin_check.js';
import { fileURLToPath } from 'url';
import path from 'path';

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const PORT = process.env.PORT || 3000;

// Load your OpenAPI spec
const openApiDocument = yaml.load(path.join(__dirname, 'docs/openapi.yaml'));

// Connect to DB
connectMongoose();

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

// Connect router to admin endpoint
app.use('/admin', admin_check, AdminRouter);

// Connect router to concepts endpoint
app.use('/concepts', ConceptRouter);

app.use('/books', BookRouter)

export default app
