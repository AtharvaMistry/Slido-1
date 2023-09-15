const mongoose = require('mongoose');

const material_schema = new mongoose.Schema({
    Material: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});

const material = mongoose.model('material', material_schema);

module.exports = { material };
