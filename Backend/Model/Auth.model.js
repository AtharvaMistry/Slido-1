const mongoose = require('mongoose');

const userauth = new mongoose.Schema({
    surname: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    dealer_address: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    pincode: {
        type: String,
        require: true,
    },
    contact: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    profession: {
        type: String,
        require: true,
    },
    at_home: {
        type: String,
        require: true,
    },
    gst_number: {
        type: String,
        require: true,
    },
    customer_type: {
        type: String,
        require: true,
    },
});



module.exports = mongoose.model("auth", userauth);