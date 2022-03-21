const { getConnection } = require("typeorm");

function filterBuilder(queryParams) {
  const filterSet = {
    maxPrice: ["price", "<"],
    minPrice: ["price", ">"],
    numBed: ["num_bad", "="],
  };
  let filterQuery = ` WHERE`;

  for (var param in queryParams) {
    console.log(queryParams[param]);
    if (queryParams[param]) {
      filterQuery += ` ${filterSet[param][0]} ${filterSet[param][1]} ${queryParams[param]} AND`;
    }
  }

  return filterQuery != ` WHERE` ? filterQuery.slice(0, -4) : "";
}

function orderByBuilder(orderBy) {
  return ` ORDER BY ${orderBy}`;
}
function limitBuilder(limit, offset) {
  return ` LIMIT ${limit} OFFSET ${offset}`;
}

const getRooms = async (queryParams, orderBy, offset, limit) => {
  const conn = getConnection();
  const order = orderBy;

  const baseQuery = `SELECT * FROM listings`;
  const filerQuery = filterBuilder(queryParams);
  const sortQuery = orderByBuilder(orderBy);
  const limitQuery = limitBuilder(limit, offset);
  const rooms = await conn.query(
    baseQuery + filerQuery + sortQuery + limitQuery + ";"
  );

  return rooms;
};

module.exports = {
  getRooms,
};
