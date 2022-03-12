const pool = require("../database/pool");

const getUsers = async () => {
  const users = await pool.query("SELECT * FROM users;");

  return users[0];
};

module.exports = { getUsers };
