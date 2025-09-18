const express = require('express');
const upload = require('../middlewares/upload');

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { reset } = require('nodemon');
const { createJob, applyJob, getAllJobs, getEmpApprovedJobs, getJobApplicants, updateJob, deleteJob } = require('../controller/jobCtrl');
const router = express.Router();


router.post('/create', authMiddleware, createJob);
router.put('/:jobId', authMiddleware, updateJob);
router.delete('/:jobId', authMiddleware, deleteJob);
router.post('/create', authMiddleware, createJob);
router.post('/apply', authMiddleware, upload.single('resume'), applyJob);
router.get('/getAllJobs', getAllJobs);
router.get('/getEmpJobs', authMiddleware, getEmpApprovedJobs);
router.get('/jobApplicants/:jobId', authMiddleware, getJobApplicants);



module.exports = router;