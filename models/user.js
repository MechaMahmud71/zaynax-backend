const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: false
        },
        phoneNo: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: false,
            minLength: 6,
            select: false
        },
        usedCoupons: [{
            type: Schema.Types.ObjectId,
            ref: 'Coupon'
        }],


    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })
}

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}



module.exports = mongoose.model('User', userSchema);
