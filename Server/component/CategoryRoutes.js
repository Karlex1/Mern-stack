import { Router } from 'express';
import * as CategoryController from '../Controller/CategoryController.js'

const router = Router();

router.delete('/:id', CategoryController.destroy);

export default router;