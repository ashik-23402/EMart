const express = require('express');
const { createProduct } = require('../Controllers/ProductController');
const { isAuthenticateUser, authorizeRole, isSellerVerified } = require('../Middleware/AuthenticateUser');

const router = express.Router();

router.route("/product/create").post(isAuthenticateUser,authorizeRole("seller"),isSellerVerified,createProduct);

module.exports = router;