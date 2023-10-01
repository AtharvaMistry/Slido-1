const mongoose = require('mongoose');

const accountant = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const Accountant = mongoose.model('Accountant', accountant)

module.exports = { Accountant }