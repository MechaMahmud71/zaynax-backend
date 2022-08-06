const express = require("express");
const router = express.Router();
const controller = require("../controller/order");
const { adminProtect } = require("../middleware/admin-auth");
const { userProtect } = require("../middleware/user-auth");

router.get("/all", adminProtect, controller.getOrders);
router.post("/place-order", userProtect, controller.placeOrder);
router.put("/change-status/:id", adminProtect, controller.changeStatus)


module.exports = router;