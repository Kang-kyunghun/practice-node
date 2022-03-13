const express = require("express");
const router = express.Router();
const pingRouter = require("./pingRouter");
const userRouter = require("./userRouter");

router.use("/ping", pingRouter);
router.use("/users", userRouter);
router.use(function (req, res, next) {
  res.status(404).send({ message: "Not Found" });
});

module.exports = router;
