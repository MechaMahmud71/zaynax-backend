const PromoCode = require("../models/promo-code");
const ErrorResponse = require('../utils/errorResponse');

exports.createCode = async (req, res, next) => {
    try {
        const promoCode = await PromoCode.create(req.body);
        return res.json({
            success: true,
            data: promoCode
        })
    } catch (error) {
        // console.log(error)
        return next(new ErrorResponse("Invalid Operation", 500));
    }

}
exports.editCode = async (req, res, next) => {
    try {
        const { id } = req.params;
        const promoCode = await PromoCode.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });
        return res.json({
            success: true,
            data: promoCode
        })
    } catch (error) {
        // console.log(error)
        return next(new ErrorResponse("Invalid Operation", 500));
    }

}
exports.changeStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const promoCode = await PromoCode.findByIdAndUpdate(id, {
            $set: {
                isActive: req.body.status
            }
        }, { new: true });
        const codes = await PromoCode.find().sort("-createdAt");
        return res.json({
            success: true,
            data: codes
        })
    } catch (error) {
        // console.log(error)
        return next(new ErrorResponse("Invalid Operation", 500));
    }

}

exports.getCode = async (req, res, next) => {
    try {
        const { id } = req.params;
        const promoCode = await PromoCode.findById(id);
        return res.json({
            success: true,
            data: promoCode
        })
    } catch (error) {
        return next(new ErrorResponse("Invalid Operation", 500));
    }

}
exports.getCodes = async (req, res, next) => {
    try {
        const promoCodes = await PromoCode.find().sort("-createdAt")
        return res.json({
            success: true,
            data: promoCodes
        })
    } catch (error) {
        return next(new ErrorResponse("Invalid Operation", 500));
    }

}

exports.deleteCode = async (req, res, next) => {
    try {
        const { id } = req.params;
        const promoCode = await PromoCode.findByIdAndDelete(id);
        return res.json({
            success: true,
            data: "Code is Deleted"
        })
    } catch (error) {
        return next(new ErrorResponse("Invalid Operation", 500));
    }

}


exports.useCode = async (req, res, next) => {
    try {
        const { code, date } = req.body;

        let promoCode = await PromoCode.findOne({ code: code });

        if (!promoCode) {
            return next(new ErrorResponse("No Promo Code is Found", 404));
        }

        promoCode = await PromoCode.findOne({
            code: code,
            endDate: {
                $gte: date
            }
        })
        if (!promoCode) {
            return next(new ErrorResponse("This promo code has expired", 500));
        }



        promoCode = await PromoCode.findOne({
            code: code,
            useTime: {
                $lt: promoCode.usage + 1
            }
        })

        if (promoCode) {
            return next(new ErrorResponse("This promo code has no Limit", 500));
        }

        promoCode = await PromoCode.findOne({
            code: code,
            isActive: true
        })
        if (!promoCode) {
            return next(new ErrorResponse("This promo code is not Active", 500));
        }

        promoCode = await PromoCode.findOneAndUpdate({ code: code }, {
            $set: {
                usage: promoCode.usage + 1
            }
        }, { new: true });

        return res.json({
            success: true,
            data: promoCode
        })
    } catch (error) {
        // console.log(error)
        return next(new ErrorResponse("Invalid Operation", 500));
    }

}