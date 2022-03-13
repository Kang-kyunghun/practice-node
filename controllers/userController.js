const { userService } = require("../services");

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();

    return res.status(200).json({ result: users });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const users = await userService.createUser(data);

    return res.status(201).json({ result: users });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await userService.logIn(data);

    return res
      .status(200)
      .json({ result: { email: user.email, token: user.token } });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  createUser,
  logIn,
};
