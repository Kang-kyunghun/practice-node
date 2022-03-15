const pool = require("../database/pool");
const { getConnection } = require("typeorm");

const getUsers = async () => {
  const conn = getConnection();

  const users = await conn.query("SELECT * FROM users;");

  return users;
};

const getUserByEmail = async (data) => {
  const conn = getConnection();

  const [user] = await conn.query(
    `SELECT * FROM users WHERE email='${data.email}'`
  );

  return user;
};

const createUser = async (data) => {
  const conn = getConnection();

  const users = await conn.query(
    ` INSERT INTO users(
        first_name, 
        last_name, 
        mobile_number, 
        email,
        password,
        kakao_id
      ) 
      VALUES(
        '${data.first_name}', 
        '${data.last_name}', 
        '${data.mobile_number}',
        '${data.email}',
        '${data.password}',
        ${data.kakao_id || null}
      );`
  );

  return users;
};

module.exports = {
  getUsers,
  getUserByEmail,
  createUser,
};
