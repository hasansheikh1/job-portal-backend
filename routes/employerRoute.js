const express = require('express');

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { reset } = require('nodemon');
const { createEmployer } = require('../controller/employerCtrl');
const validate = require('../middlewares/validate');
const { employerValidationSchema } = require('../utils/validations');
const router = express.Router();


router.post('/create',validate(employerValidationSchema), authMiddleware, createEmployer);



module.exports = router;