import { Router } from 'express';
import { logMiddleware } from '../middleware/log';
import { 
    getSupplyController, 
    getSuppliesController, 
    postSupplyController, 
    updateSupplyController, 
    deleteSupplyController 
} from '../controllers/supply';

const router = Router();
router.use(logMiddleware);
router.get('/', getSuppliesController);
router.get('/:id', getSupplyController);
router.post('/', postSupplyController);
router.put('/:id', updateSupplyController);
router.delete('/:id', deleteSupplyController);

export { router };