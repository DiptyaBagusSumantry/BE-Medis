const Sequelize = require("sequelize");

const kecamatanKemendagri = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "kecamatan_kemendagri",
    {
      kodeKecamatan: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      namaKecamatan: {
        type: Sequelize.STRING,
      },
      kodeKota: {
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

module.exports = kecamatanKemendagri;
