const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    cart: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: false
    },
    orderNo: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
        default: "Pending"
    },

}, {
    timestamps: true
})


module.exports = mongoose.model('Order', schema);