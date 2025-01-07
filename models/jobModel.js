const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const crypto = require("crypto");

// Declare the Schema of the Mongo model
var jobSchema = new mongoose.Schema({


    jobTitle: {
        type: String,
        required: true,
        index: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
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
    }


},
    {
        timestamps: true
    }
);



//Export the model
module.exports = mongoose.model('Job', jobSchema);