const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const crypto = require("crypto");

// Declare the Schema of the Mongo model
var jobSchema = new mongoose.Schema({

    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer',
        // required: true
    },

    jobTitle: {
        type: String,
        required: true,
        index: true,
        minlength: 3,
        maxlength: 100,
    },


    salary: {
        type: Number,
        // required: true,
        min: 0,
    },

    location: {
        type: String,
        required: true
    },
    jobDesc: {
        type: String,
        maxlength: 1000,
    },
    status: {
        type: String,
        enum: ['open', 'closed']
    },
    isApproved: {
        type:Boolean,
        default:false

    }




},
    {
        timestamps: true
    }
);



//Export the model
module.exports = mongoose.model('Job', jobSchema);