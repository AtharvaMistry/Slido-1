const mongoose = require('mongoose')

const quots_model = new mongoose.Schema({
    Customer_name: {
        type: String
    },
    Location_Name: {
        type: String
    },
    Date: {
        type: String
    },
    Number_of_Door: {
        type: Number
    },
    Width: {
        type: Number
    },
    Height: {
        type: Number
    },
    Pattern:{
        type:String
    },
    panelText:{
        type:[],
    },
    // selectedMaterial: {
    //     type: String
    // },
    selectedSubOption:{
        type: String
    },
    Profile:{
        type:String
    },
    total_cost:{
        type:String
    },
    soft_close:{
        type:String
    },
    profileData: {
        selectedProject: String,
        selectedSubOption: String
    }
}, {
    timestamps: true,
    versionKey: false
})

const quots = mongoose.model('Quots', quots_model)

module.exports = { quots }