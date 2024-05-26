const { Sequelize, Op } = require("sequelize");

function filter(startDate, endDate) {
  whereClause = {
    date: {
      [Op.gte]: startDate,
      [Op.lte]: endDate,
    },
  };
  return whereClause;
}

module.exports = { filter };
