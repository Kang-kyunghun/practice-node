const { userDao } = require("../models/");

const getUsers = async () => {
  const users = await userDao.getUsers();

  return users;
};

module.exports = { getUsers };
