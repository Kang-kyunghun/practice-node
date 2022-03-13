const { userDao } = require("../models/");
const bcrypt = require("bcrypt");

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
  // const mHa = async (password, saltRounds) => {
  //   return await bcrypt.hash(password, saltRounds);
  // };
  const user = await user.Dao.getUserByEmail();

  return await user;
};

module.exports = {
  getUsers,
  createUser,
};
