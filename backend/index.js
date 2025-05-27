import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import yaml from 'yamljs';
import { fileURLToPath } from 'url';
import connectMongoose from './utils/mongo.js';
import ConceptRouter from './routes/concept.router.js';
import AdminRouter from './routes/admin.router.js';
import swaggerUi from 'swagger-ui-express';


// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Constants
const PORT = process.env.PORT || 3000;

// Load your OpenAPI spec
const openApiDocument = yaml.load(path.join(__dirname, 'docs/openapi.yaml'));

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to DB
connectMongoose();

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

// // Connect router to admin endpoint
// app.use('/api/admin', AdminRouter);

// Connect router to concepts endpoint
app.use('/api/concepts', ConceptRouter);

// Serve static Vue files
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback for SPA routing
app.get('/*path', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, ()=>{
  console.log(`Server is listening on port ${PORT}`)
})
