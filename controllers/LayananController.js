const Models = require("../models/index.js");
const Layanan = Models.Layanan;
const {
  handlerError,
  handleCreate,
  handleGet,
  handleUpdate,
  handleDelete,
  handleGetPaginator,
} = require("../helper/HandlerError.js");
const { paginator } = require("../helper/Pagination.js");
const { searchWhere } = require("../helper/Search.js");

class LayananController {
  static async createLayanan(req, res) {
    try {
      const { code, name, price } = req.body;
      await Layanan.create({
        code,
        name,
        price,
      });
      handleCreate(res);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getLayanan(req, res) {
    try {
      const { page, search, sorting } = req.query;
      let whereClause = {};
      //sorting

      if (sorting) {
        whereClause.order = [["name", sorting ? sorting : "ASC"]];
      }

      //searching
      if (search) {
        whereClause.where = searchWhere(search, "name", "code");
      }

      const results = await Layanan.findAll(whereClause);
      handleGetPaginator(res, paginator(results, page ? page : 1, 20));
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getDetailLayanan(req, res) {
    try {
      const get = await Layanan.findOne({
        where: {
          id: req.params.id,
        },
      });
      handleGet(res, get);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async updatetLayanan(req, res) {
    try {
      const { code, name, price } = req.body;
      const update = await Layanan.update(
        {
          code,
          name,
          price,
        },
        {
          where: { id: req.params.id },
        }
      );
      handleUpdate(res, update);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async deleteLayanan(req, res) {
    try {
      const get = await Layanan.destroy({
        where: { id: req.params.id },
      });
      handleDelete(res, get);
    } catch (error) {
      handlerError(res, error);
    }
  }
  static async getWilayah(req, res) {
    const { kodeProvinsi, kodeKota, kodeKecamatan } = req.query;

    try {
      if (kodeProvinsi && kodeKota && kodeKecamatan) {
        // Jika ada kodeProvinsi, kodeKota, dan kodeKecamatan, cari desa berdasarkan kodeKecamatan
        const desa = await Models.Desa.findAll({
          where: { kodeKecamatan: kodeKecamatan },
        });
        return res.send(desa);
      }

      if (kodeProvinsi && kodeKota) {
        // Jika ada kodeProvinsi dan kodeKota, cari kecamatan berdasarkan kodeKota
        const kecamatan = await Models.Kecamatan.findAll({
          where: { kodeKota: kodeKota },
        });
        return res.send(kecamatan);
      }

      if (kodeProvinsi) {
        // Jika hanya ada kodeProvinsi, cari kota berdasarkan kodeProvinsi
        const kota = await Models.Kota.findAll({
          where: { kodeProvinsi: kodeProvinsi },
        });
        return res.send(kota);
      }

      if (kodeKota) {
        // Jika hanya ada kodeKota, cari kecamatan berdasarkan kodeKota
        const kecamatan = await Models.Kecamatan.findAll({
          where: { kodeKota: kodeKota },
        });
        return res.send(kecamatan);
      }

      if (kodeKecamatan) {
        // Jika hanya ada kodeKecamatan, cari desa berdasarkan kodeKecamatan
        const desa = await Models.Desa.findAll({
          where: { kodeKecamatan: kodeKecamatan },
        });
        return res.send(desa);
      }

      if (!kodeProvinsi && !kodeKota && !kodeKecamatan) {
        // Jika tidak ada parameter, tampilkan semua provinsi
        const provinsi = await Models.Provinsi.findAll();
        return res.send(provinsi);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  }
}

module.exports = LayananController;
