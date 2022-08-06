const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Admin = require('../models/admin');


exports.adminProtect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }


  if (!token) {
    return next(new ErrorResponse("Not authorized no token", 401))
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.admin = await Admin.findById(decoded.id);



    if (!req.admin) {
      return next(new ErrorResponse("Not authorized", 401))
    }


    next();

  } catch (error) {
    console.log(error.message)
    return next(new ErrorResponse("Not authorized", 401))
  }

})

