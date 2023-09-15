const mongoose = require('mongoose')

const lock_type_model = new mongoose.Schema({
    lockType: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const lock_type = mongoose.model('Lock Type', lock_type_model)

module.exports = { lock_type }