const Product = require("../Models/Product");
const Order = require("../Models/Order");
const CustomError = require("../Utils/CustomError");

exports.createOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("error create in  create order");
    console.log(error);
  }
};

//login user order
//get loogedin user order
exports.myOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log("error from order controller myorder function");
  }
};

//getsingleorder

exports.getsingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return next(new CustomError("order not found", 401));
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("error in order controller of getsingleorder");
    console.log(error);
  }
};

exports.getallOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    let totalamount = 0;
    orders.forEach((order) => {
      totalamount += order.totalPrice;
    });
    res.status(200).json({
      success: true,
      totalamount,
      orders,
    });
  } catch (error) {
    console.log("error in getall order function ");
    console.log(error);
  }
};

//updateOrderStatus--Admin
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new CustomError("order not found ", 404));
    }
    if (order.orderStatus === "Delivered") {
      return next(
        new CustomError("you have already delivered this products", 400)
      );
    }
    order.orderItems.forEach(async (orderitem) => {
      await updateStock(orderitem.product, orderitem.quantity);
    });
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log("error from update product controller");
    console.log(error);
  }
};

//deleteOrder
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new CustomError("order not found ", 404));
    }
    await order.remove();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log("error on order delete controller");
    console.log(error);
  }
};




async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stockQuantity = product.stockQuantity - quantity;

  await product.save({ validateBeforeSave: false });
}
