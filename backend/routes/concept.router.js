import {Router} from 'express';
import * as concepts from '../controllers/concept.controller.js';

const ConceptRouter = new Router();

ConceptRouter.get('/', concepts.find);
ConceptRouter.get('/subjects', concepts.getSubjects)
ConceptRouter.get('/:id', concepts.findOne);

ConceptRouter.post('/admin/seed', concepts.seed);
ConceptRouter.post('/admin/purge', concepts.purge);

export default ConceptRouter;