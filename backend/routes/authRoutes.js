const express = require('express');
const { loginUser, signupUser } = require('../controllers/authControllers');
const router  = express.Router();

//The following handles request coming to '/api/auth/login'
router.post('/login',loginUser);
//The following handles request coming to '/api/auth/signup'
router.post('/signup',signupUser);

module.exports = router;