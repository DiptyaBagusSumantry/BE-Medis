const Sequelize = require("sequelize");

const kotaKemendagri = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "kota_kemendagri",
    {
      kodeKota: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      namaKota: {
        type: Sequelize.STRING,
      },
      kodeProvinsi: {
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

module.exports = kotaKemendagri;
