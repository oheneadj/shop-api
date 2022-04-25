const { Router } = require('express');
const { verifyToken } = require('../middleware/verifyToken');

//Import product controller
const { createProduct, getAllProducts, getSingleProducts, updateProduct, deleteProduct } = require('../controller/products.controller')

const productRouter = Router();

//Get all products and Create products route
productRouter.route("/")
    .get(verifyToken, getAllProducts)
    .post(createProduct);

//Get single product, delete single product and update products routes
productRouter.route("/:productId")
    .get(getSingleProducts)
    .patch(updateProduct)
    .delete(deleteProduct);

module.exports = productRouter;
