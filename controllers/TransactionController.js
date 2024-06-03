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
      const {
        page,
        search,
        sorting,
        invoiceId,
        startDate,
        endDate,
        patientId,
      } = req.query;
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
        whereClause.where = searchWhere(search, "number_regristation", "nik");
      }

      //patientId
      if (patientId) {
        whereClause.include.where = { id: patientId };
      }
      
      //detail invoice
      if (invoiceId) {
        whereClause.where = { id: invoiceId };
      }

      const getInvoice = await Transaction.findAll(whereClause);
      let cumulativePendapatan = 0;
      const results = getInvoice.map((data) => {
        let {
          id,
          invoice,
          total_payment,
          sisa_pembayaran,
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

        
        let totalPayment = Number(total_payment);

        // Tambahkan total_payment ke cumulativePendapatan
        cumulativePendapatan += totalPayment;

        // Perbarui pendapatan pada objek saat ini
        const pendapatan = cumulativePendapatan.toString();
        
        return {
          id,
          invoice,
          total_payment,
          sisa_pembayaran,
          pendapatan,
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
      // handleGetPaginator(res, paginator(results, page ? page : 1, 20));
       res.status(200).json({
         code: 200,
         message: "Success Get Data",
         totalPendapatan: cumulativePendapatan,
         data: paginator(results, page ? page : 1, 20).data,
         totalPages: page ? page : 1,
         currentPages: 20,
       });
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async updateInvoice(req, res) {
    try {
      const { bayar } = req.body;
      const getInvoice = await Transaction.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!getInvoice) {
        return handlerError(res, { message: "Invoice tidak ditemukan!" });
      }
      let { sisa_pembayaran, total_payment } = getInvoice;

      let hasil;
      const data = parseInt(sisa_pembayaran) - bayar;
      hasil = data.toString();

      if (bayar > parseInt(sisa_pembayaran)) {
        return handlerError(res, {
          message: "Nominal Bayar Lebih Besar Dari Total Payment!",
        });
      }
      if (sisa_pembayaran == "" || sisa_pembayaran == 0) {
        await Transaction.update(
          { status: true },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        return handlerError(res, { message: "tidak ada tagihan" });
      }

      const update = await Transaction.update(
        { sisa_pembayaran: hasil },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      await Transaction.findOne({
        where: { id: req.params.id },
      }).then(async (hasil) => {
        if (hasil.sisa_pembayaran == "0") {
          await Transaction.update(
            { status: true },
            {
              where: {
                id: req.params.id,
              },
            }
          );
        }
      });
      handleUpdate(res, update);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = TransactionController;
