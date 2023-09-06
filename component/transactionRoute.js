import { Router } from "express";
import Transaction from "./TransactionModel.js";
import * as TransactionController from '../Controller/TransactionController.js'
import passport from 'passport';

const router = Router();

router.get(
    '/',  TransactionController.api);
router.post(
    "/", TransactionController.create);
router.delete(
    '/:id', TransactionController.Delete);
router.patch(
    '/:id', TransactionController.update);
export default router;