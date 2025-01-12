const Joi = require("joi");

const employerValidationSchema = Joi.object({
    // userId: Joi.string().required(), // Must be a valid MongoDB ObjectId
    companyName: Joi.string().min(3).max(200).required(),
    companyEmail: Joi.string().email().required(), // Optional field
    companyDesc: Joi.string().max(1000).optional(), // Optional field
})

module.exports={employerValidationSchema}