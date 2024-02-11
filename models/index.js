const dbConfig = require("../config/config.js");
const Sequelize = require("sequelize");
const User = require("./UserModels.js");
const Patient = require("./PatientModel.js");
const Historypatient = require("./HistoryPatientModel.js");
const Transaction = require("./TransactionModel.js");
const Medicine = require("./MedicineModel.js");

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
db.HistoryPateint = Historypatient(sequelizeInstance);
db.Transaction = Transaction(sequelizeInstance);
db.Medicine = Medicine(sequelizeInstance);

// History Patient - Patient
db.Patient.hasMany(db.HistoryPateint, {
  foreignKey: {
    name: "patientId",
    type: Sequelize.UUID,
    allowNull: false,
  },
});

db.HistoryPateint.belongsTo(db.Patient, {
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
db.HistoryPateint.hasMany(db.Transaction, {
  foreignKey: {
    name: "historyPatientId",
    type: Sequelize.UUID,
    allowNull: false,
  },
});

db.Transaction.belongsTo(db.HistoryPateint, {
  targetKey: "id",
});

module.exports = db;
