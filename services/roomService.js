const { roomDao } = require("../models/");

const getRooms = async (queryParams, orderBy, offset, limit) => {
  const rooms = await roomDao.getRooms(queryParams, orderBy, offset, limit);

  return rooms;
};

module.exports = {
  getRooms,
};
