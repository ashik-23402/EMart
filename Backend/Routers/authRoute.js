const express = require('express');
const { hello, registerUser } = require('../Controllers/authControllers');

const router = express.Router();


router.route("/test").get(hello);
router.route("/register").post(registerUser);


module.exports = router;