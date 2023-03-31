import {Router} from "express";
import TransactionRoutes from "./component/transactionRoute.js";
import AuthRoute from './component/AuthRoute.js';
import UserRoutes from './component/UserRoutes.js';

const router = Router();

router.use('/', TransactionRoutes);
router.use('/auth', AuthRoute);
router.use('/user', UserRoutes);

export default router;