const { Schema, model } = require('mongoose');

const TransactionSchema = Schema({

    userId: {
        type: String
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    restaurants: {
        type: [String]
    }

});

module.exports = model( 'Transaction', TransactionSchema );