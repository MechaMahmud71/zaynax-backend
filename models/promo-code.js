const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    code: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: false,
        default: Date.now()
    },
    endDate: {
        type: Date,
        required: false,
        default: Date.now()
    },
    discountRate: {
        type: Number,
        required: true
    },
    useTime: {
        type: Number,
        required: true
    },
    usage: {
        type: Number,
        required: false,
        default: 0
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('PromoCode', schema);