const { Jurnal, Perkiraan } = require("../models/schema");
const { body, validationResult, param } = require("express-validator");
const { err400 } = require("../helpers/messages");

module.exports = {
  validateBeforeCreatePerkiraan: (req, res, next) => {
    const { kode_perkiraan, nama_perkiraan, kelompok_akun } = req.body;
    if (kode_perkiraan === "" || undefined) {
      return res.status(400).json(err400("kode_perkiraan tidak boleh kosong"));
    } else if (nama_perkiraan === "" || undefined) {
      return res.status(400).json(err400("nama_perkiraan tidak boleh kosong"));
    } else if (kelompok_akun === "" || undefined) {
      return res.status(400).json(err400("kelompok_akun tidak boleh kosong"));
    }
    next();
  },
  validatejurnalBeforeCreate: async (req, res, next) => {
    let validators = [
      body("tanggalJurnal")
        .exists()
        .withMessage("Field tanggal jurnal harus tersedia")
        .bail()
        .notEmpty()
        .withMessage("Tanggal jurnal tidak boleh kosong")
        .bail()
        .isISO8601()
        .withMessage("Format tanggal harus sesuai")
        .bail()
        .toDate(),
      body("nomerBukti")
        .exists()
        .withMessage("Field nomer bukti  harus tersedia")
        .bail()
        .notEmpty()
        .withMessage("nomer bukti tidak boleh kosong"),
      body("uraian")
        .exists()
        .withMessage("Field uraian  harus tersedia")
        .bail()
        .notEmpty()
        .withMessage("uraian tidak boleh kosong")
        .toUpperCase(),
      // body("kodePerkiraan")
      //   .exists()
      //   .withMessage("Field kode perkiraan harus tersedia")
      //   .bail()
      //   .notEmpty()
      //   .withMessage("Kode perkiraan tidak boleh kosong")
      //   .bail()
      //   .custom(async (value) => {
      //     let perkiraan = await Perkiraan.findOne({ kode: value });
      //     if (!perkiraan) {
      //       return Promise.reject("kode Perkiraan Tidak Tersedia");
      //     }
      //   }),
      // body("namaPerkiraanJurnal")
      //   .exists()
      //   .withMessage("Field nama Perkiraan harus tersedia")
      //   .bail()
      //   .notEmpty()
      //   .withMessage("Nama Perkiraan boleh kosong")
      //   .bail()
      //   .toUpperCase()
      //   .custom(async (value, { req }) => {
      //     let perkiraan = await Perkiraan.findOne({
      //       kode_perkiraan: req.body.kodePerkiraan,
      //     });
      //     if (perkiraan.nama_perkiraan != value) {
      //       return Promise.reject("Nama Perkiraan tidak valid");
      //     }
      //   }),
      // body("debet")
      //   .exists()
      //   .withMessage("Field debet  harus tersedia")
      //   .bail()
      //   .notEmpty()
      //   .withMessage("debet tidak boleh kosong"),
      // body("kredit")
      //   .exists()
      //   .withMessage("Field kredit  harus tersedia")
      //   .bail()
      //   .notEmpty()
      //   .withMessage("kredit tidak boleh kosong"),
    ];
    for (let validation of validators) {
      const result = await validation.run(req);
      // if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json(err400(errors.array()));
  },
};
