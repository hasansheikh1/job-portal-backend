const express = require('express');

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { reset } = require('nodemon');
const { createJob, applyJob, getAllJobs } = require('../controller/jobCtrl');
const router = express.Router();


router.post('/create', authMiddleware, createJob);
router.post('/apply', authMiddleware, applyJob);
router.get('/getAllJobs', getAllJobs);



module.exports = router;