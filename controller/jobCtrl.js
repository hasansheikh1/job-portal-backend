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

        if(!jobId){
        return res.status(400).json({message:"Unprocessable Content"})
        }
    console.log("applying user",_id)

    try {
        

        const existingApplication = await Application.findOne({ jobId, userId: _id });
        if (existingApplication) {
            return res.status(200).json({
                message: "You have already applied for this job.",
                applied: true
            });
        }


        const application = await Application.create({

            jobId,
            userId:_id
        })

        res.status(201).json({
            message:"Apllication Submitted Successfully",
            application
        })


    } 
    catch (error) {
        if (error.code === 11000) {
            // Handle duplicate application error
            return res.status(400).json({
                message: 'You have already applied for this job.',
            });
        }
        console.log("Application Error",error)

        res.status(500).json({message:"Internal server error"})
    }

})



module.exports = { createJob,applyJob };