const Sequelize = require("sequelize");

const historyPatient = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "history_patients",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Date Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Date Can't be Empty!",
          },
        },
      },
      diagnosis: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Diagnosis Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Diagnosis Can't be Empty!",
          },
        },
      },
      therapy: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Therapy Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Therapy Can't be Empty!",
          },
        },
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Description Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Description Can't be Empty!",
          },
        },
      },
      service: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Service Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Service Can't be Empty!",
          },
        },
      },
      odontogram: {
        type: Sequelize.TEXT("long"),
      },
      odontogram_gambar: {
        type: Sequelize.TEXT("long"),
      },
      koreksi: {
        type: Sequelize.STRING,
        default: " ",
      },
      namaKeluarga: {
        type: Sequelize.STRING,
        default: " ",
      },
      jenisKelaminKeluarga: {
        type: Sequelize.STRING,
        default: " ",
      },
      alamatKeluarga: {
        type: Sequelize.STRING,
        default: " ",
      },
      telpKeluarga: {
        type: Sequelize.STRING,
        default: " ",
      },
      statusInformContent: {
        type: Sequelize.STRING,
        default: null,
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
      underscored: true,
    }
  );
};

module.exports = historyPatient;
