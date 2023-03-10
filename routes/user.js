const express = require('express');

//controller functions import
const { loginUser, registerUser } = require('../controllers/userController')

const router = express.Router();

// Login route
router.post('/login', loginUser)

// Signup route
router.post('/register', registerUser)


module.exports = router;