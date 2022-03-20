const { userDao } = require("../models/");
const axios = require("axios");
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

const kakaoLogIn = async (kakaoToken) => {
  const kakaoUser = await userFromKakao(kakaoToken);

  if (!kakaoUser.code === 200) {
    const error = new Error("Ivalid User");
    error.statusCode = 401;

    throw error;
  }

  let user = await userDao.getUserBykakaoId(kakaoUser.id);

  if (!user) {
    const { id, properties, kakao_account } = kakaoUser;

    user = await userDao.createUser(
      (email = kakao_account.email),
      (password = Math.random().toString(36).slice(2)),
      (firstName = ""),
      (lastName = properties.nickname),
      (mobileNumber = ""),
      (kakkaoId = id)
    );
    user.email = kakao_account.email;
  }

  const token = jwt.sign({ user_id: user.id }, "secret");
  user.token = token;

  return user;
};

async function userFromKakao(kakaoToken) {
  const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
    timeout: 3000,
    validateStatus: function (status) {
      return status < 500;
    },
  });
  return response.data;
}

module.exports = {
  getUsers,
  createUser,
  logIn,
  kakaoLogIn,
};
