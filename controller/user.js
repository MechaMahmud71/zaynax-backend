
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');

exports.userSignup = async (req, res, next) => {
    try {
        const { phoneNo } = req.body;
        let user = await User.findOne({ phoneNo: phoneNo })

        if (user) {
            return next(new ErrorResponse("User with this Phone No already exists", 406))
        }

        user = await User.create(req.body);

        sendTokenResponse(user, 200, res);

    } catch (error) {

        return next(new ErrorResponse("User is not added", 500))

    }
}

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    return res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            data: user
        })

}

// Login Admin..

exports.userLogin = async (req, res, next) => {
    try {
        const { phoneNo, password } = req.body;

        if (!phoneNo || !password) {
            return next("Fields are missing")
        }


        const user = await User.findOne({ phoneNo: phoneNo }).select('+password');
        if (!user) {
            return next(new ErrorResponse(`No user found`, 404));
        }
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse(`invalid password`, 400));
        }
        sendTokenResponse(user, 200, res);

    } catch (error) {
        return next(new ErrorResponse(`Login error`, 401));
    }
}