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

const getUserBykakaoId = async (kakaoId) => {
  const conn = getConnection();

  const [user] = await conn.query(
    `SELECT * FROM users WHERE kakao_id=${kakaoId}`
  );

  return user;
};

const createUser = async (
  email,
  password,
  firstName,
  lastName,
  mobileNumber,
  kakkaoId = null
) => {
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
        '${firstName}', 
        '${lastName}', 
        '${mobileNumber}',
        '${email}',
        '${password}',
        ${kakkaoId}
      );`
  );

  return users;
};

module.exports = {
  getUsers,
  getUserByEmail,
  getUserBykakaoId,
  createUser,
};
