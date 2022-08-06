const express = require("express");

//routes
const adminRoutes = require("./admin");
const userRoutes = require("./user");
const productRoutes = require("./product");
const codeRoutes = require("./promo-code");
const orderRoutes = require("./order");


const router = express.Router();

router.get("/", (req, res) => {
    return res.json({
        Name: "Zaynax Backend"
    })
})

router.use("/api/v1/admin", adminRoutes);
router.use("/api/v1/user", userRoutes);
router.use("/api/v1/product", productRoutes);
router.use("/api/v1/promo-code", codeRoutes);
router.use("/api/v1/order", orderRoutes);


module.exports = router;