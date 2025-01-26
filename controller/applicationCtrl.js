const Application = require('../models/applicationModel');
const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');


const userApplications=asyncHandler(async(req,res)=>{

    const {id}=req?.user;
    console.log("user id",id)

    if(!id){
        return res.status(400).json({message:"User doesnt exist"})
    }

    const application = await Application.find({userId:id}).populate("jobId");
    
    if(!application){
        return res.status(400).json({message:"No applications found"})
    }
    
    res.status(200).json({
        message:"Applications found",
        application
    })


})


module.exports={userApplications};

