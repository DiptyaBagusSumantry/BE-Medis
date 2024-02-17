const Models = require("../models/index.js");
const Patient = Models.Patient;
const {
  handleCreate,
  handlerError,
  handleGet,
} = require("../helper/HandlerError.js");

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
      let countPatient = await Patient.count()+1;
      const number_regristation = String(countPatient).padStart(6, "0");
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
      await Patient.findAll().then((data) => {
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
      handlerError;
    }
  }
}

module.exports = PatientController;
