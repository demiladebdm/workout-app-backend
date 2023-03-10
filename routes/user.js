const express = require('express');

//controller functions import
const { loginUser, registerUser } = require('../controllers/userController')

const router = express.Router();

// Login route
router.post('https://workout-app-api.onrender.com/login', loginUser)

// Signup route
router.post('https://workout-app-api.onrender.com/register', registerUser)


module.exports = router;