const mongoose = require('mongoose');

const connectDB = async () => {
    const connection = await mongoose.connect("mongodb+srv://mahmud:mahmud@cluster0-jvn0s.gcp.mongodb.net/zaynax?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Mongodb is connected`.yellow.bold);
}

module.exports = connectDB