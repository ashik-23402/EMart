const express = require('express');
const { hello, registerUser, login } = require('../Controllers/authControllers');

const router = express.Router();


router.route("/test").get(hello);
router.route("/register").post(registerUser);
router.route("/login").post(login);


module.exports = router;