const express = require('express');
const { isAuthenticateUser, authorizeRole } = require('../Middleware/AuthenticateUser');
const { createOrder, myOrder, getsingleOrder, getallOrders, updateOrderStatus, deleteOrder } = require('../Controllers/orderController');

const router = express.Router();


router.route("/order/create").post(isAuthenticateUser,createOrder);
router.route("/order/me").get(isAuthenticateUser,myOrder);
router.route("/order/:id").get(isAuthenticateUser,getsingleOrder);
router.route("/admin/orders").get(isAuthenticateUser,authorizeRole("admin"),getallOrders);
router.route("/admin/order/:id").put(isAuthenticateUser,authorizeRole("admin"),updateOrderStatus)
                                .delete(isAuthenticateUser,authorizeRole("admin"),deleteOrder);

module.exports = router;