const mongoose = require('mongoose')

const expected_delivery_date_model = new mongoose.Schema({
    name: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const expected_delivery_date = mongoose.model('Delivery Date', expected_delivery_date_model)

module.exports = { expected_delivery_date }