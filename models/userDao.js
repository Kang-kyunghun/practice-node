const pool = require("../database/pool");

const getUsers = async () => {
  const users = await pool.query("SELECT * FROM users;");

  return users[0];
};

const getUserByEmail = async (data) => {
  return await pool.query(`SELECT * FROM users WHERE email='${data.email}'`);
};

const createUser = async (data) => {
  const users = await pool.query(
    ` INSERT INTO users(
        username, 
        email, 
        password, 
        mobile_number
      ) 
      VALUES(
        '${data.username}', 
        '${data.email}', 
        '${data.password}',
        '${data.mobileNumber}'
      );`
  );

  return users;
};

module.exports = {
  getUsers,
  getUserByEmail,
  createUser,
};
