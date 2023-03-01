const mongoose = require('mongoose');

const MembersInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    phoneNumber: {
        type: Number,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    // gender: "male"
})

// MembersInfoSchema.path('myCustomTTLField').index({ expires: 60 });

const membersInformation = mongoose.model('MEMBERSINFORMATION',  MembersInfoSchema );

module.exports = membersInformation;