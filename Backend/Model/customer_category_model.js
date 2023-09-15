const mongoose = require('mongoose')

const customer_category_model = new mongoose.Schema({
    name: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const customer_category = mongoose.model('customer category', customer_category_model)

module.exports = { customer_category }