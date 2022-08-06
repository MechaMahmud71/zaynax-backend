const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');


exports.userProtect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  else if (req.cookies.token) {
    token = req.cookies.token;
  }



  if (!token) {
    return next(new ErrorResponse("Not authorized no token", 401))
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorResponse("Not authorized", 401))
    }
    next();

  } catch (error) {
    return next(new ErrorResponse("Not authorized", 401))
  }

})


