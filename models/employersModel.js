const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const crypto = require("crypto");

// Declare the Schema of the Mongo model
var employerSchema = new mongoose.Schema({


    userId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        },
    companyName: {
        type: String,
        required: true,
        index: true,
    },

    companyEmail: {
        type: String,
        // required: true,
        unique: true,
    },
    
    companyDesc: {
        type: String,
        // required: true,
        unique: true,
    },
    
isApproved:{
    Boolean

}
    

},
    {
        timestamps: true
    }
);



//Export the model
module.exports = mongoose.model('Employer', employerSchema);