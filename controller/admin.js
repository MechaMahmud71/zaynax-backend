
const Admin = require('../models/admin');
const ErrorResponse = require('../utils/errorResponse');


exports.adminLogin = async (req, res, next) => {
    try {
        const { credential, password } = req.body;

        if (!credential || !password) {
            return next(new ErrorResponse(`Login error`, 401));
        }


        const admin = await Admin.findOne({ userId: credential }).select('+password');

        if (!admin) {
            await Admin.create(req.body);
            return res.json({
                msg: "Admin is created"
            })
        }
        const isMatch = await admin.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse(`invalid password`, 400));
        }
        sendTokenResponse(admin, 200, res);

    } catch (error) {
        console.log(error)
        return next(new ErrorResponse(`Login error`, 401));
    }
}



const sendTokenResponse = (admin, statusCode, res) => {
    const token = admin.getSignedJwtToken();

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
            data: admin
        })

}


