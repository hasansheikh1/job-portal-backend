const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
  
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        const user = await User.findById(decoded?.id).select("-password"); 
        // exclude password if you don’t need it
  
        if (!user) {
          res.status(401);
          throw new Error("User not found, not authorized");
        }
  
        req.user = user;
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed or expired");
      }
    } else {
      res.status(401);
      throw new Error("No token attached to header");
    }
  });

const isAdmin = asyncHandler(async (req, res, next) => {

    // console.log("request user", req.user)
    const { email } = req?.user;
    const adminUser = await User.findOne({ email });
    if (adminUser.role != 'admin') {
        throw new Error("You're not an admin")
    }
    else {
        next();
    }
})


module.exports = { authMiddleware, isAdmin };