const Sequelize = require("sequelize");

const desaKemendagri = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "desa_kemendagri",
    {
      kodeDesa: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      namaDesa: {
        type: Sequelize.STRING,
      },
      kodeKecamatan: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
      underscored: true,
      timestamps: false,
    }
  );
};

module.exports = desaKemendagri;
