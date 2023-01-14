import {Router} from "express";
import Transaction  from "./TransactionModel.js";

const router=Router();

router.get(
    '/transaction', async (req, res) => {
        const transaction = await Transaction.find({}).sort({createdAt :-1});
        res.json({ data: transaction });
    }
)
router.post(
    "/transaction", async (req, res) => {
        const { amount, description, date } = req.body;
        // we got form data from frontend to backend by req of Post of backend now we getting the data so we have to store it.
        const transaction = new Transaction({
            amount,
            description,
            date,
        })
        await transaction.save()
        res.json({ output: transaction });
    }
);

export default router;