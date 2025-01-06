const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const crypto = require("crypto");

// Declare the Schema of the Mongo model
var employerSchema = new mongoose.Schema({

    user: {


    },

    companyName: {
        type: String,
        required: true,
        index: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },


},
    {
        timestamps: true
    }
);



//Export the model
module.exports = mongoose.model('Employer', employerSchema);