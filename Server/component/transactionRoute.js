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


router.delete('/transaction/:id',async (req,res)=>{
    await Transaction.findOneAndDelete({_id:req.params.id});
    res.json({message:'Success'})
})

router.patch('/transaction/:id', async (req, res) => {
    await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({ message: 'Success' })
})
export default router;