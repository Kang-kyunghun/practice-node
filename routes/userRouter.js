const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");

router.get("", userController.getUsers);
router.post("", userController.createUser);
router.post("/login", userController.logIn);

module.exports = router;
