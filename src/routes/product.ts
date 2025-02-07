import { Router } from 'express';
import { logMiddleware } from '../middleware/log';
import { 
    getProductController, 
    getProductsController, 
    postProduct, 
    updateProductController, 
    deleteProductController 
} from '../controllers/product';

const router = Router();
router.use(logMiddleware);
router.get('/', getProductsController);
router.get('/:id', getProductController);
router.post('/', postProduct);
router.put('/:id', updateProductController);
router.delete('/:id', deleteProductController);

export { router };