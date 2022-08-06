const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new Schema({
    userId: {
        type: String,
        required: false,
        default: "Test_User2020"
    },
    userName: {
        type: String,
        required: true,
        default: "Admin"
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false,
        default: "Easy_123"
    },

});

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    })
}

adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}



module.exports = mongoose.model('Admin', adminSchema);
