const multer = require("multer");
const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const FILE_DIR = "./uploads";
const acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    if (acceptedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ErrorResponse("This file type can not be accepted", 401), false);
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});

module.exports = upload;