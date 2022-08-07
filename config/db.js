const mongoose = require('mongoose');

const connectDB = async () => {
    const connection = await mongoose.connect("mongodb://0.0.0.0:27017/zaynax-backend", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Mongodb is connected`.yellow.bold);
}

module.exports = connectDB