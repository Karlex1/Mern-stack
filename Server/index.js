import {Router} from "express";
import TransactionRoutes from "./component/transactionRoute.js";
import AuthRoute from './component/AuthRoute.js';
import UserRoutes from './component/UserRoutes.js';
import CategoryRoutes from './component/CategoryRoutes.js'


import passport from "passport";

const router = Router();

router.use('/transaction', passport.authenticate('jwt', { session: false }), TransactionRoutes);
router.use('/auth', AuthRoute);
router.use('/user', UserRoutes);
router.use('/category', passport.authenticate('jwt', { session: false }), CategoryRoutes);


export default router;