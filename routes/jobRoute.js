const express = require('express');

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { reset } = require('nodemon');
const { createJob } = require('../controller/jobCtrl');
const router = express.Router();


router.post('/create', authMiddleware, createJob);



module.exports = router;