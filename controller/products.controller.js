const Product = require('../model/product.model')

// Create Product
const createProduct = async(req, res) => {
    try {
        console.log(req.user);
        const product = await Product.create(req.body);
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

// Get All Products
const getAllProducts = async(req, res) => {
    try {
       console.log(req.user)
       const products = await Product.find({});
       res.status(200).json(products);
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//Get Single Product
const getSingleProducts = async(req, res) => {
    try {
        //Get product ID from request object
        const productId = req.params.productId

        //Get id from database
        const product = await Product.findById(productId);
       
       //Check if there is no product
       if(!product) {
           return res.status(404).json({message: 'Product not found'});
       }
       res.status(200).json(product);
    } catch (error) {
        res.status(400).json({message: 'Product not found'})
    }
}

//Update Product
const updateProduct = async (req, res) => {
   try {

    //Get product ID from request object
    const productId = req.params.productId;

    //Get id from database
    let  product = await Product.findById(productId);

    //Check if there is no product
    if(!product) {
        return res.status(404).json({message: 'Product not found'});
    }
    //Find product by id and update it
    product = await Product.findByIdAndUpdate(productId, req.body, {new: true});

   } catch (error) {
    res.status(400).json({message: 'Update unsuccessful'})   
   } 
}


//Delete a product
const deleteProduct = async (req, res) => {
    try {

    //Get product ID from request object
    const productId = req.params.productId;

    //Get id from database
    let  product = await Product.findById(productId);

    //Check if there is no product
    if(!product) {
        return res.status(404).json({message: 'Product not found'});
    }
    //Find product by id and update it
    product = await Product.findByIdAndDelete(productId);
    res.status(200).json(req.params.productId);
        
    } catch (error) {
        res.status(400).json({message: 'Could not delete product'})  
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProducts,
    updateProduct,
    deleteProduct

}