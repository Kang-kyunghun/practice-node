const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");

router.get("", userController.getUsers);
router.post("", userController.signUp);
router.post("/auth", userController.logIn);
router.post("/auth/kakao", userController.kakaoLogIn);

module.exports = router;
