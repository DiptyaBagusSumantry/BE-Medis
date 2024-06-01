const Models = require("../models/index");
const RekamMedis = Models.HistoryPatient;
const Patient = Models.Patient;
const Transaction = Models.Transaction;
const moment = require("moment");

const {
  handlerError,
  handleUpdate,
  handleGetPaginator,
} = require("../helper/HandlerError.js");
const { paginator } = require("../helper/Pagination.js");
const { searchWhere } = require("../helper/Search.js");
const { Op, Sequelize } = require("sequelize");
const { filter } = require("../helper/FIlter.js");

class TransactionController {
  static async getInvoice(req, res) {
    try {
      const { page, search, sorting, invoiceId, startDate, endDate, patientId } =
        req.query;
      // const invoiceId = req.query.invoiceId;
      const whereClause = {
        include: { model: Patient },
      };
      //sorting
      whereClause.order = [["createdAt", sorting ? sorting : "DESC"]];

      //filter
      if (endDate) {
        whereClause.where = {
          ...whereClause.where,
          ...filter(startDate, endDate),
        };
      }

      //searching
      if (search) {
        whereClause.where = searchWhere(
          search,
          "number_regristation",
          "nik"
        );
      }

      //patientId
      if(patientId){
        whereClause.include.where = {id: patientId}
      }
      // console.log(whereClause)
      // return res.send(whereClause)
      //detail invoice
      if (invoiceId) {
        whereClause.where = { id: invoiceId };
      }

      const getInvoice = await Transaction.findAll(whereClause);

      const results = getInvoice.map((data) => {
        let {
          id,
          invoice,
          total_payment,
          status,
          purchased,
          createdAt,
          service,
        } = data.dataValues;
        const {
          number_regristation: noRm,
          nik,
          fullname,
          address,
          alamatKTP,
          kecamatan,
          kelurahan,
          kota,
          kodePos,
          rt,
          rw,
        } = data.dataValues.patient;
        createdAt = new Date(createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        purchased = JSON.parse(purchased);

        const layanan = purchased.filter((item) => item.type === "service");
        const obat = purchased.filter((item) => item.type === "obat");

        return {
          id,
          invoice,
          total_payment,
          status,
          createdAt,
          layanan,
          obat,
          fullname,
          noRm,
          nik,
          address,
          alamatKTP,
          kecamatan,
          kelurahan,
          kota,
          kodePos,
          rt,
          rw,
        };
      });
      handleGetPaginator(res, paginator(results, page ? page : 1, 20));
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async updateInvoice(req, res) {
    try {
      const update = await Transaction.update(
        { status: req.body.status },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      handleUpdate(res, update);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = TransactionController;
