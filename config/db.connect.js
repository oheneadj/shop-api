const mongoose = require('mongoose');

//Connect to database
const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://techspotlabs:kuzco555@techspotlabscluster.k06vf.mongodb.net/shopapi?retryWrites=true&w=majority")
        console.log('Database connected 🍜 ')
    } catch (error) {
        // Log debug error
        console.log(error)
        process.exit(1)
        
    }
}

module.exports = { dbConnect }