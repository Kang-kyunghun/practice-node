const { userDao } = require("../models/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async () => {
  return await userDao.getUsers();
};

const createUser = async (data) => {
  const saltRounds = 10;
  const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
  };

  data.password = await makeHash(data.password, saltRounds);
  return await userDao.createUser(data);
};

const logIn = async (data) => {
  const user = await userDao.getUserByEmail(data);

  let error;

  if (!user) {
    error = new Error("INVALID_USER");
    error.statusCode = 401;

    throw error;
  }

  const checkPassword = await bcrypt.compare(data.password, user.password);

  if (!checkPassword) {
    error = new Error("INVALID_USER");
    error.statusCode = 401;

    throw error;
  }

  const token = jwt.sign({ user_id: user.id }, "secret");
  user.token = token;

  return user;
};

module.exports = {
  getUsers,
  createUser,
  logIn,
};
