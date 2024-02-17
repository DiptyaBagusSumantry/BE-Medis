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
      const { date, name, service, odontogram } = req.body;

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
        place_birth: "not-found",
        date_birth: date,
        gender: "not-found",
        address: "not-found",
        work: "not-found",
        phone: `${new Date().getTime()}`,
        history_illness: "not-found",
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

      const createTransaksi = await Transaction.create({
        invoice: `${new Date().getTime()}`,
        purchased: JSON.stringify(service),
        total_payment: total_payment.toString(),
        patientId: createPatient.id,
        historyPatientId: createRM.id,
      });

      return res.send(createTransaksi);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getInvoice(req, res) {
    try {
      const invoiceId = req.query.invoiceId;
      const whereClause = {
        include: { model: Patient },
      };
      if (invoiceId) {
        whereClause.where = { id: invoiceId };
      }

      const getInvoice = await Transaction.findAll(whereClause);

      const result = getInvoice.map((data) => {
        let { id, invoice, total_payment, status, purchased, createdAt } =
          data.dataValues;
        const { fullname } = data.dataValues.patient;
        createdAt = new Date(createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        return {
          id,
          invoice,
          total_payment,
          status,
          createdAt,
          fullname,
          purchased: JSON.parse(purchased),
        };
      });
      res.send(result);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = RekamMedisController;
