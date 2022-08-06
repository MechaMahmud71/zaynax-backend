const Order = require('../models/order');
const ErrorResponse = require('../utils/errorResponse');

exports.placeOrder = async (req, res, next) => {
    try {
        const { cart } = req.body;
        const orderBody = {
            cart: cart,
            total: JSON.parse(cart).total + JSON.parse(cart).shippingCharge - JSON.parse(cart).discount,
            orderNo: Math.floor(Math.random() * 100000)
        }

        const order = await Order.create(orderBody);
        return res.json({
            success: true,
            data: order
        })
    } catch (error) {
        // console.log(error);
        return next(new ErrorResponse("Invalid operation", 500))
    }

}

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().sort('-createdAt');
        return res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        // console.log(error);
        return next(new ErrorResponse("Invalid operation", 500))
    }
}

exports.changeStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(id, {
            $set: {
                status: status
            }
        }, { new: true })
        const orders = await Order.find();

        return res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        // console.log(error);
        return next(new ErrorResponse("Invalid operation", 500))
    }
}