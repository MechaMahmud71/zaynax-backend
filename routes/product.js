const express = require("express");
const router = express.Router();
const controller = require("../controller/product");
const { adminProtect } = require("../middleware/admin-auth");
const upload = require("../utils/multer");

router.post("/add", adminProtect, upload.single("image"), controller.addProduct);
router.get("/products", controller.getAllProducts);
router.get("/admin-products", controller.getAllAdminProducts);
router.get("/search", controller.searchProduct);

module.exports = router;