const mongoose = require('mongoose');

const payment = new mongoose.Schema({
    payment_option: {
        type: String
    },
    date: {
        type: String
    },
    transaction_No: {
        type: String
    },
    amount_recived_from: {
        type: String
    },
    recived_amount: {
        type: Number
    },
    remarks: {
        type: String
    },
    total_amount:{
        type: Number
    },
    Customer_name:{
        type:String
    },
    Location:{
        type:String
    }

}, {
    timestamps: true,
    versionKey: false
})

const Payment = mongoose.model('Payment Type', payment)

module.exports = { Payment }