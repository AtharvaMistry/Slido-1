const mongoose = require('mongoose')

const room_model = new mongoose.Schema({
    room: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const room = mongoose.model('Room', room_model)

module.exports = { room }