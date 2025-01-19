const Job = require('../models/jobModel');
const asyncHandler = require('express-async-handler');
const  Application = require('../models/applicationModel');


const createJob = asyncHandler(async (req, res) => {



    // if(req.user.role!='employer'){
    //     return res.status(403).json({message:"Access denied. Only employers can create jobs."})
    // }
    try {
        const { body } = req.body
        // console.log("req ", body)
        const job = await Job.create({
            ...req.body
        })

        res.status(201).json({

            message: "Job created successfully",

        })
    } catch (error) {
        console.log("Error creating job ", error)
        res.status(500).json({

            message: error,

        })
    }




})


const applyJob = asyncHandler(async(req,res)=>{

    const {jobId}=req.body
    const {_id}= req?.user

    console.log("applying user",_id)

    try {
        
        const user = Application.create




    } 
    catch (error) {
        


    }

})


module.exports = { createJob,applyJob };