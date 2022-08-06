const express = require("express");
const router = express.Router();
const controller = require("../controller/admin");

router.post("/login", controller.adminLogin);

module.exports = router;