const express = require('express');
const upload = require('../middlewares/upload');

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { reset } = require('nodemon');
const { createJob, applyJob, getAllJobs, getEmpApprovedJobs } = require('../controller/jobCtrl');
const router = express.Router();


router.post('/create', authMiddleware, createJob);
router.post('/apply', authMiddleware, upload.single('resume'), applyJob);
router.get('/getAllJobs', getAllJobs);
router.get('/getEmpJobs', authMiddleware, getEmpApprovedJobs);



module.exports = router;