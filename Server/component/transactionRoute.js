import { Router } from "express";
import Transaction from "./TransactionModel.js";
import * as TransactionController from '../Controller/TransactionController.js'
import passport from 'passport';

const router = Router();

router.get(
    '/transaction', passport.authenticate('jwt', { session: false }), TransactionController.api);
router.post(
    "/transaction", TransactionController.create);
router.delete(
    '/transaction/:id', TransactionController.Delete);
router.patch(
    '/transaction/:id', TransactionController.update);
export default router;