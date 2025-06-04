import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import yaml from 'yamljs';
import connectMongoose from './utils/mongo.js';
import ConceptRouter from './routes/concept.router.js';
import BookRouter from './routes/book.router.js';
import AdminRouter from './routes/admin.router.js';
import swaggerUi from 'swagger-ui-express';
import { admin_check } from './middleware/admin_check.js';

// Constants
const PORT = process.env.PORT || 3000;

// Load your OpenAPI spec
const openApiDocument = yaml.load(path.join(process.cwd(), 'docs/openapi.yaml'));

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to DB
connectMongoose();

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

// Connect router to admin endpoint
app.use('/admin', admin_check, AdminRouter);

// Connect router to concepts endpoint
app.use('/concepts', ConceptRouter);

app.use('/books', BookRouter)

app.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}`)
})
