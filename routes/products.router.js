const { Router } = require('express')

//Import product controller
const { createProduct, getAllProducts, getSingleProducts, updateProduct, deleteProduct } = require('../controller/products.controller')

const productRouter = Router();

//Get all products and Create products route
productRouter.route("/")
    .get(getAllProducts)
    .post(createProduct);

//Get single product, delete single product and update products routes
productRouter.route("/:productId")
    .get(getSingleProducts)
    .patch(updateProduct)
    .delete(deleteProduct);

module.exports = {
    productRouter
}