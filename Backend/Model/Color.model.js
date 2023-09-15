const mongoose = require('mongoose');

const Color_collection_model = new mongoose.Schema({
    color: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const Color_collection = mongoose.model('Color Collection', Color_collection_model)

module.exports = { Color_collection }