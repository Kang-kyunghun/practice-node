const { getConnection } = require("typeorm");

const getUsers = async () => {
  const conn = getConnection();

  const users = await conn.query("SELECT * FROM users;");

  return users;
};

const getUserByEmail = async (userDto) => {
  const conn = getConnection();

  const [user] = await conn.query(
    `SELECT * FROM users WHERE email='${userDto.email}'`
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

const createUser = async (userDto) => {
  const conn = getConnection();

  const { email, password, first_name, last_name, mobile_number, kakao_id } =
    userDto;

  const users = await conn.query(
    `INSERT INTO users(
        first_name, 
        last_name, 
        mobile_number, 
        email,
        password,
        kakao_id
      ) 
      VALUES(?,?,?,?,?,?);`,
    [first_name, last_name, mobile_number, email, password, kakao_id]
  );
  return users;
};

module.exports = {
  getUsers,
  getUserByEmail,
  getUserBykakaoId,
  createUser,
};
