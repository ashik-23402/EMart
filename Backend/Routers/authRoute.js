const express = require('express');
const { hello, registerUser, login } = require('../Controllers/authControllers');
const { setUserRole } = require('../Middleware/AuthenticateUser');

const router = express.Router();


router.route("/test").get(hello);
router.route("/register/user").post(setUserRole("normal"),registerUser);
router.route("/register/seller").post(setUserRole("seller"),registerUser);
router.route("/login").post(login);


module.exports = router;