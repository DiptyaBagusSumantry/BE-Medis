const dbConfig = require("../config/config.js");
const Sequelize = require("sequelize");
const User = require("./UserModels.js");
const Patient = require("./PatientModel.js");
const HistoryPatient = require("./HistoryPatientModel.js");
const Transaction = require("./TransactionModel.js");
const Layanan = require("./LayananModel.js");
const Obat = require("./ObatModel.js");
const Provinsi = require("./provinsiKemendagri.js");
const Kota = require("./kotaKemendagri.js");
const Kecamatan = require("./kecamatanKemendagri.js");
const Desa = require("./desaKemendagri.js");

const sequelizeInstance = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};
db.sequelizeInstance = sequelizeInstance;
db.User = User(sequelizeInstance);
db.Patient = Patient(sequelizeInstance);
db.HistoryPatient = HistoryPatient(sequelizeInstance);
db.Transaction = Transaction(sequelizeInstance);
db.Layanan = Layanan(sequelizeInstance);
db.Obat = Obat(sequelizeInstance);
db.Provinsi = Provinsi(sequelizeInstance);
db.Kota = Kota(sequelizeInstance);
db.Kecamatan = Kecamatan(sequelizeInstance);
db.Desa = Desa(sequelizeInstance);

// History Patient - Patient
db.Patient.hasMany(db.HistoryPatient, {
  foreignKey: {
    name: "patientId",
    type: Sequelize.UUID,
    allowNull: false,
  },
});

db.HistoryPatient.belongsTo(db.Patient, {
  targetKey: "id",
});
// Transaction - Patient
db.Patient.hasMany(db.Transaction, {
  foreignKey: {
    name: "patientId",
    type: Sequelize.UUID,
    allowNull: false,
  },
});

db.Transaction.belongsTo(db.Patient, {
  targetKey: "id",
});
// Transaction - HistoryPatient
db.HistoryPatient.hasMany(db.Transaction, {
  foreignKey: {
    name: "historyPatientId",
    type: Sequelize.UUID,
    allowNull: false,
  },
});

db.Transaction.belongsTo(db.HistoryPatient, {
  targetKey: "id",
});

// // Transaction - HistoryPatient
// db.Provinsi.hasMany(db.Kota, {
//   foreignKey: {
//     name: "kodeProvinsiId",
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// db.Kota.belongsTo(db.Provinsi, {
//   targetKey: "kodeProvinsi",
// });



module.exports = db;
