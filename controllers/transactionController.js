const { response, request } = require('express');
const Transaction = require('../models/transaction');

const transactionsGet = async(req = request, res = response) => {

    const { limit = 5, skip = 0 } = req.query;
    const user = req.user;
    const query = { userId: user._id };

    const [ count, transactions ] = await Promise.all([
        Transaction.countDocuments(query),
        Transaction.find(query)
            .skip( Number( skip ) )
            .limit(Number( limit ))
    ]);

    res.json({
        count,
        transactions
    });
}

module.exports = {
    transactionsGet,
}