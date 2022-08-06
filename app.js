const express = require("express");
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require("./routes");
require("colors");
connectDB();
dotenv.config({ path: ".env" });



const errorHandler = require("./middleware/error");

/**
 *  Router File Import
 */



const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false
}))

app.use("/uploads", express.static("uploads"));

app.use(router)
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, console.log(`server has started on ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold));

process.on('unhandledRejection', (err, promise) => {
    console.log(`ERROR:${err.message}`.red);
    server.close(() => process.exit(1));
})