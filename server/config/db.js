const mongoose = require('mongoose')
const connectDB = async () => {


    try {
        mongoose.set('strictQuery', false);
        const on = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`The database is Connected: ${on.connection.host}`);
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;