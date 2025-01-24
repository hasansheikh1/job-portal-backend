const Job = require('../models/jobModel');
const asyncHandler = require('express-async-handler');
const Application = require('../models/applicationModel');
const Employee = require('../models/employersModel');


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
    console.log("applying user", _id)

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
            userId: _id
        })

        res.status(201).json({
            message: "Apllication Submitted Successfully",
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
        console.log("Application Error", error)

        res.status(500).json({ message: "Internal server error" })
    }

})

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





module.exports = { createJob, applyJob, getAllJobs, getEmpApprovedJobs };