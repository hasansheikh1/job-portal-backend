const express = require('express');

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { reset } = require('nodemon');
const { createJob, applyJob } = require('../controller/jobCtrl');
const router = express.Router();


router.post('/create', authMiddleware, createJob);
router.post('/apply', authMiddleware, applyJob);



module.exports = router;