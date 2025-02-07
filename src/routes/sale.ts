import { Router } from 'express';
import { logMiddleware } from '../middleware/log';
import { 
    getSaleController, 
    getSalesController, 
    postSale 
} from '../controllers/sale';

const router = Router();
router.use(logMiddleware);
router.get('/', getSalesController);
router.get('/:id', getSaleController);
router.post('/', postSale);

export { router };