const { userService } = require("../services");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    return res.status(200).json({ result: users });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getUsers };
