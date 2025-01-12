const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const crypto = require("crypto");

// Declare the Schema of the Mongo model
var employerSchema = new mongoose.Schema({


    userId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },

    companyName: {
        type: String,
        required: true,
        // index: true,
    },

    companyEmail: {
        type: String,
        // required: true,
        // unique: true, just commented for development phase

    },

    companyDesc: {
        type: String,
        // required: true,
        // unique: true,
    },

   

},
    {
        timestamps: true
    }
);



//Export the model
module.exports = mongoose.model('Employer', employerSchema);