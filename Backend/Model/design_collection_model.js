const mongoose = require('mongoose')

const design_collection_model = new mongoose.Schema({
    design: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const design_collection = mongoose.model('Design Collection', design_collection_model)

module.exports = { design_collection }