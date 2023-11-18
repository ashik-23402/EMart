const express = require('express');
const { createProduct } = require('../Controllers/ProductController');
const { isAuthenticateUser, authorizeRole } = require('../Middleware/AuthenticateUser');

const router = express.Router();

router.route("/product/create").post(isAuthenticateUser,authorizeRole("seller"),createProduct);

module.exports = router;