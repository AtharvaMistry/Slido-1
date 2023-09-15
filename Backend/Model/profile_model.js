const mongoose = require('mongoose');

const profile_schema = new mongoose.Schema({
    profile1: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});

const Profile = mongoose.model('Profile', profile_schema);

module.exports = Profile;
