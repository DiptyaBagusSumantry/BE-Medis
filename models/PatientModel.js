const Sequelize = require("sequelize");

const Patient = (sequelizeInstance) => {
  return sequelizeInstance.define(
    "patients",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: "id",
      },
      number_regristation: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          args: "number_regristation",
          msg: "Number Regristation Already Registered!",
        },
        validate: {
          notNull: {
            args: true,
            msg: "Number Regristation Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Number Regristation Can't be Empty!",
          },
        },
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Fullname Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Fullname Can't be Empty!",
          },
        },
      },
      place_birth: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Place Birth Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Place Birth Can't be Empty!",
          },
        },
      },
      date_birth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Date Birth Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Date Birth Can't be Empty!",
          },
        },
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Gender Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Gender Can't be Empty!",
          },
        },
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Address Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Address Can't be Empty!",
          },
        },
      },
      work: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "work Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "work Can't be Empty!",
          },
        },
      },
      phone: {
        type: Sequelize.STRING,
        unique: {
          args: "phone",
          msg: "Phone Already Registered!",
        },
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Phone Can't be Null",
          },
          notEmpty: {
            args: true,
            msg: "Phone Can't be Empty",
          },
          isNumeric: {
            args: true,
            msg: "Phone Must be Number",
          },
          len: {
            args: [10, 15],
            msg: "Phone Must be 10 - 15 Number!",
          },
        },
      },
      history_illness: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "History Illness Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "History Illness Can't be Empty!",
          },
        },
      },
      nik: {
        type: Sequelize.STRING,
        // allowNull: false,
        unique: {
          args: "nik",
          msg: "NIK Already Registered!",
        },
        // validate: {
        //   notNull: {
        //     args: true,
        //     msg: "NIK Can't be Null!",
        //   },
        //   notEmpty: {
        //     args: true,
        //     msg: "NIK Can't be Empty!",
        //   },
        //   len: {
        //     args: 16,
        //     msg: "NIK Must be 16 Number!",
        //   },
        //   isNumeric: {
        //     args: true,
        //     msg: "NIK Must be Number",
        //   },
        // },
      },
      namaIbuKandung: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Nama Ibu Kandung Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Nama Ibu Kandung Can't be Empty!",
          },
        },
      },
      agama: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Agama Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Agama Can't be Empty!",
          },
        },
      },
      alamatKTP: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Alamat KTP Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Alamat KTP Can't be Empty!",
          },
        },
      },
      kecamatan: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Kecamatan Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Kecamatan Can't be Empty!",
          },
        },
      },
      kelurahan: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "kelurahan Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "kelurahan Can't be Empty!",
          },
        },
      },
      kota: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Kota Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Kota Can't be Empty!",
          },
        },
      },
      provinsi: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Provinsi Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Provinsi Can't be Empty!",
          },
        },
      },
      kodePos: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Kode Pos Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "Kode Pos Can't be Empty!",
          },
        },
      },
      rt: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "RT Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "RT Can't be Empty!",
          },
        },
      },
      rw: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "RW Can't be Null!",
          },
          notEmpty: {
            args: true,
            msg: "RW Can't be Empty!",
          },
        },
      },
    },
    {
      freezeTableName: true,
      // paranoid: true,
      underscored: true,
    }
  );
};

module.exports = Patient;
