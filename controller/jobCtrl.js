const Job = require('../models/jobModel');
const asyncHandler = require('express-async-handler');
const Application = require('../models/applicationModel');
const Employee = require('../models/employersModel');
const cloudinary = require('../config/cloudinary');
const { parseResume } = require('../config/affinda');


const createJob = asyncHandler(async (req, res) => {

    if (req?.user?.role != 'employer') {
        return res.status(403).json({ message: "Access denied. Only employers can create jobs." })
    }

    try {
        const { body } = req.body
        const userId = req?.user?._id;

        const valid = await Employee.findOne({ userId })


        if (!valid) {
            return res.status(403).json({ message: "Your're Not an Employer. Signup as an employer to create job " })
        }

        const job = await Job.create({
            ...req.body,
            employerId: valid._id
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


const applyJob = asyncHandler(async (req, res) => {
    const { jobId } = req.body
    const { _id } = req?.user

    if (!jobId) {
        return res.status(400).json({ message: "Unprocessable Content" })
    }
    if (!req.file) {
        return res.status(400).json({ message: "Resume (PDF) is required" })
    }
    try {
        const existingApplication = await Application.findOne({ jobId, userId: _id });
        if (existingApplication) {
            return res.status(200).json({
                message: "You have already applied for this job.",
                applied: true
            });
        }
        // Upload resume to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: 'raw', folder: 'resumes' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(req.file.buffer);
        });
        // Parse resume with Affinda
        const parsedResume = await parseResume(req.file.buffer);
        // Create application with resumeUrl and parsedResume
        const application = await Application.create({
            jobId,
            userId: _id,
            resumeUrl: uploadResult.secure_url,
            parsedResume
        });
        res.status(201).json({
            message: "Application Submitted Successfully",
            application
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'You have already applied for this job.' });
        }
        console.log("Application Error", error)
        res.status(500).json({ message: "Internal server error" })
    }
});

const getAllJobs = asyncHandler(async (req, res) => {

    // const jobs = await Job.find({}).sort({createdAt:-1})
    // res.json(jobs)
    // console.log("req.query",req?.query)
    const limit = req?.query.limit || 10;
    const cursor = req?.query.cursor;
    let query = {};
    if (cursor) {
        query = { _id: { $gt: cursor } };
    }

    try {

        const jobs = await Job.find(query).sort({ createdAt: -1 }).limit(parseInt(limit))
        // createdAt:-1 indicates that the jobs will be sorted by latest one of descending order of date
        res.status(200).json({
            jobs,
            cursor: jobs.length > 0 ? jobs[jobs.length - 1]?._id : null
        })



    } catch (error) {

        console.log("Error fetching jobs", error)
        res.status(500).json({ message: "Internal server error" })

    }



})


const getEmpApprovedJobs = asyncHandler(async (req, res) => {


    const { _id } = req.user;
    const approve = req.query.isApproved || false;

    let query = {};


    try {
        const emp = await Employee.findOne({ userId: _id });

        if (!emp) {
            return res.status(403).json({ message: "You're not an employer" });
        }
        query = { employerId: emp._id };
        if (approve) {
            query.isApproved = true;
        }
        
        const jobs = await Job.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            jobs
        });
    } catch (error) {
        console.log("Error fetching jobs", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const getJobApplicants = asyncHandler(async (req, res) => {

    const {jobId} = req.params;
    const {_id} = req.user;
if(!jobId){
    return res.status(400).json({message:"Job ID is required"})
}
if(!_id){
    return res.status(400).json({message:"User ID is required"})
}

try{
const applicants = await Application.find({jobId}).populate("userId","firstname email");

    res.status(200).json({
        message:"Job applicants fetched successfully",
        jobId,
        totalApplicants:applicants.length,
        applicants:applicants.map(app=>({
            applicationId:app._id,
            firstname:app.userId.firstname,
            email:app.userId.email,
            status:app.status,
            appliedAt:app.appliedAt,
            resumeUrl:app.resumeUrl,
            
        })),
       
    });

}
catch(error){
    console.log("Error fetching job applicants", error);
    res.status(500).json({ message: "Internal server error" });
}
    
})




module.exports = { createJob, applyJob, getAllJobs, getEmpApprovedJobs,getJobApplicants };