const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const crypto = require("crypto");

// Declare the Schema of the Mongo model
var jobSchema = new mongoose.Schema({

    eemployerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    jobTitle: {
        type: String,
        required: true,
        index: true,
    },

  
    salary: {
        type: Number,
        // required: true,
    },
    location: {
        type: String,
        required: true
    },
    jobDesc: {
        type: String,
    },
    status:{
        type: String,
        enum: ['user', 'admin', 'moderator']
    }



},
    {
        timestamps: true
    }
);



//Export the model
module.exports = mongoose.model('Job', jobSchema);