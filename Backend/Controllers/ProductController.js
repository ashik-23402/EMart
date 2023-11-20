const Product = require("../Models/Product");
const CustomError = require("../Utils/CustomError");
const Seller = require("../Models/Seller");

exports.createProduct = async (req, res, next) => {
  try {
    req.body.seller = await Seller.findOne({ user: req.user.id });

    const seller = await Seller.findOne({ user: req.user.id });

    const product = await Product.create(req.body);

    // update perticular seller products

    seller.products.push(product._id);

    await seller.save();

    // console.log(product._id);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("error from ProductController");
    res.status(500).json({
      message: "creation failed on product controller",
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new CustomError("product not found ", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("error find in product update controller");
    console.log(error);
  }
};

//delete products
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new CustomError("Product not found", 404));
    }
    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "product delete sucessfully",
    });
  } catch (error) {
    console.log("error id from deleteporduct");
    console.log(error);
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new CustomError("Product not found", 404));
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("error get from get single product controller");
    console.log(error);
  }
};

//create and update review
exports.createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
     
    };
    const product = await Product.findById(productId);
    const isReviewed = await product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
      product.numofreviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg = avg + rev.rating;
    });
    //product.reviews.length;
    // product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log("error create from review controller");
    console.log(error);
  }
}


//delete review

































