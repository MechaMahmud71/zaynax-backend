const Product = require('../models/product');
const ErrorResponse = require("../utils/errorResponse");

exports.addProduct = async (req, res, next) => {
    try {
        let path = "";
        req.file.path = req.file.path.split("\\").join("/");
        path = req.file.path;
        req.body.image = path;
        const product = await Product.create(req.body);
        if (!product) {
            return next(new ErrorResponse("Product creation is failed", 500));
        }
        return res.json({
            success: true,
            data: product
        })
    } catch (error) {
        // console.log(error);
        return next(new ErrorResponse("Invalid Operation", 500));
    }

}


exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({
            isActive: true
        });
        return res.json({
            success: true,
            data: products
        })
    } catch (error) {
        return next(new ErrorResponse("Invalid Operation", 500));
    }
}
exports.getAllAdminProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        return res.json({
            success: true,
            data: products
        })
    } catch (error) {
        return next(new ErrorResponse("Invalid Operation", 500));
    }
}

exports.searchProduct = async (req, res, next) => {
    try {
        const { keyword } = req.query;
        let products = [];
        if (keyword === "") {
            products = await Product.find();
        }
        products = await Product.find({
            name: {
                $regex: keyword,
                $options: "i"
            }
        })
        return res.json({
            success: true,
            data: products
        })
    } catch (error) {
        // console.log(error);
        return next(new ErrorResponse("Invalid operation", 500))
    }
}