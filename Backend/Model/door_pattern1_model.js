const mongoose = require('mongoose')

const door_pattern1_model = new mongoose.Schema({
    door_patter1: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const door_pattern1 = mongoose.model('Door Pattern1', door_pattern1_model)

module.exports = { door_pattern1 }