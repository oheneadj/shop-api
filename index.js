const express = require('express');
//import database
const { dbConnect } = require('./config/db.connect')

//Import routes
const productRouter = require('./routes/products.router');
//const authRouter = require('./routes/auth.router')

const app = express();

 app.use(express.json());
 app.use("/products", productRouter);
//  app.use("/auth", authRouter);

//Start server and connect to database

const start = async () => {
    await dbConnect();

    //Set PORT Number
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 🚀 Server running on port ${PORT}`);
    })
}

start();

