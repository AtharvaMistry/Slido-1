const mongoose = require('mongoose')

const door_pattern2_model = new mongoose.Schema({
    door_patter2: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const door_pattern2 = mongoose.model('Door Pattern 2', door_pattern2_model)

module.exports = { door_pattern2 }