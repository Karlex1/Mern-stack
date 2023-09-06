import Transaction from "../component/TransactionModel.js";
// back to front
export const api = async (req, res) => {
    const transaction = await Transaction.find({ user_id: req.user._id }).sort({ createdAt: -1 });

    const demo = await Transaction.aggregate([
        { $match: { user_id: req.user._id }, },
        {
            $group: {
                _id: { $month: '$date' },
                transactions: {
                    $push: {
                        amount: '$amount',
                        description: '$description',
                        date: '$date',
                        category_id: '$category_id',
                        _id:'$_id'
                    }
                },
                totalExpenses: {
                    $sum:'$amount',
                }
            },
        },
    ])
    res.json({ data: demo });
}
// front to back
export const create = async (req, res) => {
    const { amount, description, date, category_id } = req.body;
    // we got form data from frontend to backend by req of Post of backend now we getting the data so we have to store it.
    const transaction = new Transaction({
        amount,
        description,
        date,
        user_id: req.user._id,
        category_id,
    })
    await transaction.save()
    res.json({ output: transaction });
}
// delete api
export const Delete = async (req, res) => {
    await Transaction.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Success' })
}
// updation api
export const update = async (req, res) => {
    await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({ message: 'Success' })
}