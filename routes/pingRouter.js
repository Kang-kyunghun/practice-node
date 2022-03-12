const express = require("express");
const router = express.Router();

const { pingController } = require("../controllers");

router.get("", pingController.ping);

module.exports = router;
