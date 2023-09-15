const mongoose = require('mongoose')

const customer_type_model = new mongoose.Schema({
    name: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const customer_type = mongoose.model('Customer Type', customer_type_model)

module.exports = { customer_type }