const express = require('express');
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { reset } = require('nodemon');
const validate = require('../middlewares/validate');
const { userApplications } = require('../controller/applicationCtrl');

const router = express.Router();


router.get('/getAppliedJobs', authMiddleware, userApplications);



module.exports = router;