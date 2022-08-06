const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    basePrice: {
        type: String,
        required: false
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    discountRate: {
        type: Number,
        required: true
    },
    shippingCharge: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: false,
        default: 1
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true
})

schema.pre('save', function () {
    this.basePrice = this.sellingPrice;
    const discount = Math.floor((this.sellingPrice * this.discountRate) / 100);
    this.sellingPrice = this.sellingPrice - discount;
})

module.exports = mongoose.model('Product', schema);