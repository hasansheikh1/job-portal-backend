const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const crypto = require("crypto");




// Declare the Schema of the Mongo model
var applicationSchema = new mongoose.Schema({

    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },


    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

    appliedAt: {
        type: Date,
        default: Date.now, // Automatically set the date when the application is created
    },


},
    {
        timestamps: true
    }
);

applicationSchema.index({jobId:1,userId:1},{unique})


//Export the model
module.exports = mongoose.model('Application', applicationSchema);