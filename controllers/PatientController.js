const Models = require("../models/index.js");
const Patient = Models.Patient;
const {
  handleCreate,
  handlerError,
  handleGet,
  handleUpdate,
  handleDelete,
} = require("../helper/HandlerError.js");
const sequelize = require('sequelize')

class PatientController {
  static async createPatient(req, res) {
    try {
      const {
        fullname,
        place_birth,
        date_birth,
        gender,
        address,
        work,
        phone,
        history_illness,
      } = req.body;
      // let countPatient = (await Patient.count()) + 1;
      // const number_regristation = String(countPatient).padStart(6, "0");

       let countPatient = await Patient.findAll({
         //  order: [sequelize.fn("max", sequelize.col("number_regristation"))],
        //  attributes: [
        //    sequelize.fn("MAX", sequelize.col("number_regristation")),
        //  ],
       });

       console.log(countPatient);
       return res.send(countPatient);

      await Patient.create({
        number_regristation,
        fullname,
        place_birth,
        date_birth,
        gender,
        address,
        work,
        phone,
        history_illness,
      });
      handleCreate(res);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getPatient(req, res) {
    try {
      const {limit, offset, search } = req.query
      const whereClause = {};
      if (req.query.id) {
        whereClause.id = { id: req.query.id };
      }
      // return res.send(whereClause)

      await Patient.findAll({
        whereClause,
      }).then((data) => {
        const results = data.map((patient) => {
          const {
            id,
            fullname,
            place_birth,
            date_birth,
            gender,
            address,
            work,
            phone,
            history_illness,
          } = patient.dataValues;

          return {
            id,
            fullname,
            place_birth,
            date_birth,
            gender,
            address,
            work,
            phone,
            history_illness,
          };
        });
        handleGet(res, results);
      });
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async detailPatient(req,res){
    try {
      await Patient.findOne({
        where: {
          id: req.params.id
        }
      }).then(data=>{
        handleGet(res,data)
      })
    } catch (error) {
      handlerError/(res,error)
    }
  }
  static async updatePatient(req, res) {
    try {
      const {
        fullname,
        place_birth,
        date_birth,
        gender,
        address,
        work,
        phone,
        history_illness,
      } = req.body;
      const updateData = await Patient.update(
        {
          fullname,
          place_birth,
          date_birth,
          gender,
          address,
          work,
          phone,
          history_illness,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      handleUpdate(res, updateData);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async deletePatient(req, res) {
    try {
      const deleteData = await Patient.destroy({
        where: {
          id: req.params.id,
        },
      });
      handleDelete(res, deleteData);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = PatientController;
