const { roomService } = require("../services");

const getRooms = async (req, res, next) => {
  try {
    const queryParams = {
      maxPrice: req.query.maxPrice,
      minPrice: req.query.minPrice,
      numBed: req.query.numBed,
    };
    const orderBy = req.query.orderBy || "id";
    const offset = +req.query.offset || 0;
    const limit = +req.query.limit || 10;

    const rooms = await roomService.getRooms(
      queryParams,
      orderBy,
      offset,
      limit
    );

    return res.status(200).json({
      results: rooms.length,
      rooms: rooms,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRooms,
};
