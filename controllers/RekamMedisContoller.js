const Models = require("../models/index");
const RekamMedis = Models.HistoryPatient;
const Patient = Models.Patient;
const Transaction = Models.Transaction;
const {
  handlerError,
  handleCreate,
  handleGet,
  handleUpdate,
  handleDelete,
} = require("../helper/HandlerError.js");

class RekamMedisController {
  static async createRekamMedis(req, res) {
    try {
      const {
        date,
        name,
        service,
        odontogram,
        place_birth,
        date_birth,
        gender,
        address,
        work,
        phone,
        history_illness,
      } = req.body;

      //number RM
      let countPatient = (await Patient.count()) + 1;
      const number_regristation = String(countPatient).padStart(6, "0");

      //count total pyemnt
      let total_payment = 0;
      service.forEach((element) => {
        total_payment += parseInt(element.price);
      });
      if (isNaN(total_payment)) {
        const err = { message: "price must be integer" };
        return handlerError(res, err);
      }

      const createPatient = await Patient.create({
        number_regristation,
        fullname: name,
        place_birth: place_birth || "not-found",
        date_birth: date_birth || date,
        gender: gender || "not-found",
        address: address || "not-found",
        work: work || "not-found",
        phone: phone || `${new Date().getTime()}`,
        history_illness: history_illness || "not-found",
      });

      const createRM = await RekamMedis.create({
        date,
        diagnosis: "not-found",
        therapy: "not-found",
        status: "not-found",
        description: "not-found",
        answer_tooth: JSON.stringify(odontogram),
        patientId: createPatient.id,
      });

      await Transaction.create({
        invoice: `${new Date().getTime()}`,
        purchased: JSON.stringify(service),
        total_payment: total_payment.toString(),
        patientId: createPatient.id,
        historyPatientId: createRM.id,
      });

      handleCreate(res);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getRM(req, res) {
    try {
      const get = await RekamMedis.findAll({
        include: [{ model: Patient }, { model: Transaction }],
      });
      const reuslt = get.map((data) => {
        console.log(data.dataValues.transactions[0].purchased);
        const { id, date } = data.dataValues;
        const { number_regristation, fullname, phone, gender } =
          data.dataValues.patient;
        const { purchased } = data.dataValues.transactions[0];
        let hasil = "";
        const proses = JSON.parse(purchased);
        proses.forEach((data) => {
          hasil += data.name + ", ";
        });
        return {
          id,
          number_regristation,
          date,
          fullname,
          gender,
          phone,
          hasil,
        };
      });
      handleGet(res, reuslt);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getDetailRM(req, res) {
    try {
      const get = await RekamMedis.findOne({
        where: { id: req.params.id },
        include: [{ model: Patient }, { model: Transaction }],
      });
      const { id, diagnosis, therapy, description } = get.dataValues;
      const {
        number_regristation,
        fullname,
        place_birth,
        date_birth,
        gender,
        phone,
        address,
        work,
        history_illness,
      } = get.dataValues.patient;
      const { purchased } = get.dataValues.transactions[0];
      let hasil = "";
      const proses = JSON.parse(purchased);
      proses.forEach((data) => {
        hasil += data.name + ", ";
      });
      const data = {
        id,
        number_regristation,
        fullname,
        place_birth,
        date_birth,
        gender,
        phone,
        address,
        work,
        history_illness,
        diagnosis,
        therapy,
        description,
        hasil,
      };
      handleGet(res, data);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = RekamMedisController;
