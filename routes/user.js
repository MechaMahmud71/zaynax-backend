const express = require("express");
const router = express.Router();
const controller = require("../controller/user");

router.post("/login", controller.userLogin);
router.post("/sign-up", controller.userSignup)

module.exports = router;