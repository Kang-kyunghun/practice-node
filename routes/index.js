const express = require("express");
const router = express.Router();
const pingRouter = require("./pingRouter");
const userRouter = require("./userRouter");

router.use("/ping", pingRouter);
router.use("/users", userRouter);

module.exports = router;
