import { Router } from 'express';
import * as admin from '../controllers/admin.controller.js';

const AdminRouter = Router();

AdminRouter.get('/clean', admin.clean)
AdminRouter.get('/seed', admin.seed)
AdminRouter.get('/dump/books', admin.dumpBooks)
AdminRouter.get('/dump/concepts', admin.dumpConcepts)

export default AdminRouter;