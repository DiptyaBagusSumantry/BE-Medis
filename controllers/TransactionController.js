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
const { where } = require("sequelize");

class TransactionController {
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
      handleGet(res, result);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async updateInvoice(req, res) {
    try {
      const update = await Transaction.update(
        {status: req.body.status},
        {
          where: {
            id: req.params.id,
          },
        }
      );
      handleUpdate(res, update)
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = TransactionController;
