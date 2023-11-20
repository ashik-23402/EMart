const express = require('express');
const { createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, deleteReview } = require('../Controllers/ProductController');
const { isAuthenticateUser, authorizeRole, isSellerVerified } = require('../Middleware/AuthenticateUser');

const router = express.Router();

router.route("/product/create").post(isAuthenticateUser,authorizeRole("seller"),isSellerVerified,createProduct);
router.route("/product/update/:id").put(isAuthenticateUser,updateProduct);
router.route("/product/delete/:id").delete(isAuthenticateUser,deleteProduct);
router.route("/product/get/:id").get(getSingleProduct);

router.route("/product/review").put(isAuthenticateUser,createProductReview);
// router.route("/product/review").delete(isAuthenticateUser,deleteReview);


module.exports = router;