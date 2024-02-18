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
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Status Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Status Can't be Empty!",
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
      answer_tooth: {
        type: Sequelize.TEXT,
        // allowNull: false,
        // validate: {
        //   notNull: {
        //     args: true,
        //     msg: "Answer Tooth Can't be Null!",
        //   },
        //   notEmpty: {
        //     args: true,
        //     msg: "Answer Tooth Can't be Empty!",
        //   },
        // },
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
