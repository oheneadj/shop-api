const express = require('express');
const productRouter = require('./routes/products.router');
const app = express();

//import database
const { dbConnect } = require('./config/db.connect')

app.use(express.json());

app.use("/products", productRouter);

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

