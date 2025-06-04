import {Router} from 'express';
import * as concepts from '../controllers/concept.controller.js';

const ConceptRouter = new Router();

ConceptRouter.get('/', concepts.find);
ConceptRouter.get('/health', concepts.healthCheck);
ConceptRouter.get('/grades', concepts.getAllGrades);
ConceptRouter.get('/subjects', concepts.getAllSubjects);
ConceptRouter.get('/:grade/:subject/:slug', concepts.findOne);

export default ConceptRouter;