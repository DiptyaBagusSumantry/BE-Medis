const Models = require("../models/index");
const RekamMedis = Models.HistoryPatient;
const Patient = Models.Patient;
const Transaction = Models.Transaction;
const moment = require("moment");
const {
  handlerError,
  handleCreate,
  handleGet,
  handleGetPaginator,
  handleDelete,
  handleUpdate,
} = require("../helper/HandlerError.js");
const { paginator } = require("../helper/Pagination.js");
const { searchWhere } = require("../helper/Search.js");
const { filter } = require("../helper/FIlter.js");

class RekamMedisController {
  static async createRekamMedis(req, res) {
    try {
      const {
        date,
        diagnosis,
        therapy,
        service,
        description,
        odontogram,
        patient_id,
      } = req.body;

      //count total pyemnt
      let total_payment = 0;
      service.forEach((element) => {
        total_payment += parseInt(element.price);
      });
      if (isNaN(total_payment)) {
        const err = { message: "price must be integer" };
        return handlerError(res, err);
      }

      const createRM = await RekamMedis.create({
        date,
        diagnosis,
        therapy,
        service: JSON.stringify(service),
        description,
        odontogram: JSON.stringify(odontogram),
        patientId: patient_id,
      });

      await Transaction.create({
        invoice: `${new Date().getTime()}`,
        purchased: JSON.stringify(service),
        total_payment: total_payment.toString(),
        patientId: patient_id,
        historyPatientId: createRM.id,
        date: moment().format("YYYY-MM-DD"),
      });

      handleCreate(res);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getRM(req, res) {
    try {
      const { page, search, sorting, startDate, endDate } = req.query;
      let whereClause = { include: { model: Patient }, where: {} };
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
        whereClause.where = {
          ...whereClause.where,
          ...searchWhere(search, "patient.number_regristation", "patient.nik"),
        };
      }

      await RekamMedis.findAll(whereClause).then((get) => {
        const results = get.map((data) => {
          const {
            id,
            date,
            description,
            service,
            odontogram,
            diagnosis,
            therapy,
            koreksi
          } = data.dataValues;
          const {
            id: id_patient,
            nik,
            number_regristation,
            fullname,
            phone,
            gender,
          } = data.dataValues.patient;
          const proses = JSON.parse(service);
          const hasil = proses.map((results) => results.name).join(", ");
          return {
            id,
            id_patient,
            nik,
            number_regristation,
            description,
            date,
            fullname,
            gender,
            phone,
            hasil,
            diagnosis,
            therapy,
            koreksi,
            odontogram: JSON.parse(odontogram),
          };
        });
        handleGetPaginator(res, paginator(results, page ? page : 1, 20));
      });
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getDetailRM(req, res) {
    try {
      const get = await RekamMedis.findOne({
        where: { id: req.params.id },
        include: { model: Patient },
      });
      if (!get) {
        return handleGet(res, get);
      }

      const { id, diagnosis, therapy, description, date, service, odontogram, koreksi } =
        get.dataValues;
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
        nik,
        namaIbuKandung,
        agama,
        alamatKTP,
        kecamatan,
        kelurahan,
        kota,
        kodePos,
        rt,
        rw,
      } = get.dataValues.patient;

      const tgl = new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      const data = {
        id,
        date: tgl,
        number_regristation,
        fullname,
        place_birth,
        date_birth,
        gender,
        phone,
        address,
        work,
        history_illness,
        koreksi,
        nik, 
        namaIbuKandung,
        agama,
        alamatKTP,
        kecamatan,
        kelurahan,
        kota,
        kodePos,
        rt,
        rw,
        diagnosis,
        therapy,
        description,
        service: JSON.parse(service),
        odontogram: JSON.parse(odontogram),
      };
      handleGet(res, data);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getDetailbyPatient(req, res) {
    try {
      const get = await Patient.findAll({
        where: {
          id: req.params.id,
        },
        include: {
          model: RekamMedis,
        },
      });
      if (get.length <= 0) {
        return handleGet(res, get);
      }
      if (get[0].dataValues.history_patients.length <= 0) {
        return handlerError(res, { message: "History Rekam Medis Not Found" });
      }
      const rekamMedis = get[0].dataValues.history_patients;
      const data = rekamMedis.map((reuslt) => {
        const {
          id,
          date,
          diagnosis,
          therapy,
          description,
          service,
          odontogram,
        } = reuslt.dataValues;
        const {
          number_regristation,
          // fullname,
          // place_birth,
          // date_birth,
          // gender,
          // phone,
          // address,
          // work,
          // history_illness,
        } = get[0].dataValues;
        return {
          id,
          number_regristation,
          // fullname,
          // place_birth,
          // date_birth,
          // gender,
          // phone,
          // address,
          // work,
          // history_illness,
          date,
          // diagnosis,
          // therapy,
          description,
          service: JSON.parse(service),
          odontogram: JSON.parse(odontogram),
        };
      });
      // return res.send(data)
      handleGet(res, data);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async updateKoreksi(req, res) {
    try {
      await RekamMedis.update({
        koreksi: req.body.koreksi
      },{
        where:{
          id: req.params.id
        }
      }).then(results=>{
        handleUpdate(res, results)
      })
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async deleteRekamMedis(req, res) {
    try {
      const deleteRM = await RekamMedis.destroy({
        where: {
          id: req.params.id,
        },
      });
      handleDelete(res, deleteRM);
    } catch (error) {
      handlerError(res, error);
    }
  }
}

module.exports = RekamMedisController;
