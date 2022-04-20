const mongoose = require('mongoose');

//Connect to database
const dbConnect = async () => {
    try {
        await mongoose.connect("process.env.MONGO_DB_CONNECT")
        console.log('Database connected 🍜 ')
    } catch (error) {
        // Log debug error
        console.log(error)
        process.exit(1)
        
    }
}