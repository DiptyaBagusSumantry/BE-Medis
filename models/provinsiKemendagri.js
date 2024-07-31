const Sequelize = require("sequelize");

const provinsiKemendagri = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "provinsi_kemendagri",
    {
      kodeProvinsi: {
        type: Sequelize.STRING,
        primaryKey: true,
        // unique: "kodeProvinsi",
      },
      namaProvinsi: {
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

module.exports = provinsiKemendagri;
