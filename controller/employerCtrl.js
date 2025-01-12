const Employer = require('../models/employersModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { employerValidationSchema } = require('../utils/validations');

const createEmployer = asyncHandler(async(req,res)=>{



        try {
            // const {error}=employerValidationSchema.validate(req.body);
            // if (error){
            //     return res.status(400).json({message:error?.details[0]?.message})
            // }
            const {id}= req.user
            if (!id) {
                return res.status(400).json({ message: "User ID is required" });
            }
            console.log("emp check",id)

            const user = await User.findByIdAndUpdate(id,{role:'employer'}, {
                new: true,
              
              })
            

            const emp = await Employer.create({
            
                userId:id,
                ...req.body
            
            })
            
            res.status(201).json({
                message:"Employer Registered Successfully",
                emp,
            })

        } catch (error) {
            console.error("Error creating Employer:", error);
            res.status(500).json({
                message: "Internal server error",
            });
        }


})



module.exports={createEmployer}