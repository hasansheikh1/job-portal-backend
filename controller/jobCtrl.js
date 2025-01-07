const Job = require('../models/jobModel');
const asyncHandler = require('express-async-handler')



const createJob = asyncHandler(async (req, res) => {

    const { email } = req.body

    res.json({
        email: email
    })


})




module.exports = { createJob };