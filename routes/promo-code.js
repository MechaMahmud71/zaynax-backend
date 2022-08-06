const express = require("express");
const router = express.Router();
const controller = require("../controller/promo-code");
const { adminProtect } = require("../middleware/admin-auth");
const { userProtect } = require("../middleware/user-auth");

router.post("/create", adminProtect, controller.createCode);
router.get("/get-all", adminProtect, controller.getCodes);
router.get("/get-code/:id", adminProtect, controller.getCode);
router.put("/edit/:id", adminProtect, controller.editCode);
router.put("/change-status/:id", adminProtect, controller.changeStatus);
router.delete("/delete/:id", adminProtect, controller.deleteCode);

router.post("/use-code", userProtect, controller.useCode);

module.exports = router;