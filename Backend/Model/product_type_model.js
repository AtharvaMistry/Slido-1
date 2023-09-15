const mongoose = require('mongoose')

const product_type_model = new mongoose.Schema({
    name: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const product_type = mongoose.model('Product Type', product_type_model)

module.exports = { product_type }