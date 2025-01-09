const Job = require('../models/jobModel');
const asyncHandler = require('express-async-handler')



const createJob = asyncHandler(async (req, res) => {



    // if(req.user.role!='employer'){
    //     return res.status(403).json({message:"Access denied. Only employers can create jobs."})
    // }
    try {
        const { body } = req.body
        console.log("req ", body)
        const job = await Job.create({
            ...req.body,
            employerId: req?.user._id,
        })

        res.status(201).json({

            message: "Job created successfully",

        })
    } catch (error) {
        console.log("Error creating job ", error)

    }




})




module.exports = { createJob };