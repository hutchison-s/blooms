import { Router } from 'express';
import * as admin from '../controllers/admin.controller.js';

const AdminRouter = Router();

AdminRouter.get('/clean', admin.clean)
AdminRouter.get('/seed', admin.seed)

export default AdminRouter;