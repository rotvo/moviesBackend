import { Router, Request, Response } from 'express';
import { loginCtrl, registerCtrl } from '../controllers/auth';
import { logMiddleware } from '../middleware/log';

const router = Router();
// http//://localhost:3000/auth/register [POST]
router.use(logMiddleware);
router.post('/register', registerCtrl );
router.post('/login', loginCtrl);



export {router};