const { userService } = require("../services");

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();

    return res.status(200).json({ result: users });
  } catch (err) {
    next(err);
  }
};

const signUp = async (req, res, next) => {
  try {
    const userDto = req.body;
    const users = await userService.signUp(userDto);

    return res.status(201).json({ result: users });
  } catch (err) {
    next(err);
  }
};

const logIn = async (req, res, next) => {
  try {
    const userDto = req.body;
    const user = await userService.logIn(userDto);

    return res
      .status(200)
      .json({ result: { email: user.email, token: user.token } });
  } catch (err) {
    next(err);
  }
};

const kakaoLogIn = async (req, res, next) => {
  try {
    const kakao_token = req.headers.authorization;
    const user = await userService.kakaoLogIn(kakao_token);

    return res
      .status(200)
      .json({ result: { email: user.email, token: user.token } });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  signUp,
  logIn,
  kakaoLogIn,
};
