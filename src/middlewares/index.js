const { Jurnal } = require("../models/schema");
const { body, validationResult } = require("express-validator");
const { err400 } = require("../helpers/messages");
const { getByKode, getByName } = require("../models/perkiraan.models");

module.exports = {
  validateBeforeCreatePerkiraan: async (req, res, next) => {
    const { kode_perkiraan, nama_perkiraan, kelompok_akun } = req.body;

    // CHECK LIMIT KODE PERKIRAAN
    if (kode_perkiraan >= 800)
      return res
        .status(400)
        .json(err400("Pengkelompokan kode_perkiraan hanya sampai sampai 7"));

    // CHECK FIELD
    if (kode_perkiraan === "" || kode_perkiraan === undefined) {
      return res.status(400).json(err400("kode_perkiraan tidak boleh kosong"));
    } else if (nama_perkiraan === "" || nama_perkiraan === undefined) {
      return res.status(400).json(err400("nama_perkiraan tidak boleh kosong"));
    } else if (kelompok_akun === "" || kelompok_akun === undefined) {
      return res.status(400).json(err400("kelompok_akun tidak boleh kosong"));
    }

    // CHECK KODE PERKIRAAN
    const checkKode = await getByKode({ kode_perkiraan: kode_perkiraan });
    if (checkKode) return res.status(400).json(err400("Kode sudah terdaftar"));

    // CHECK NAMA PERKIRAAN
    const checkNama = await getByName({
      nama_perkiraan: nama_perkiraan.toUpperCase(),
    });
    if (checkNama) return res.status(400).json(err400("Nama sudah terfdatar"));
    req.body.nama_perkiraan = nama_perkiraan.toUpperCase();
    req.body.kelompok_akun = kelompok_akun.toUpperCase();
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
  validateJurnalBeforeUpdate: (req, res, next) => {
    const { uraian, nomerBukti, namaPerkiraanJurnal, debet, kredit } = req.body;
    if (uraian === "" || uraian === undefined) {
      return res.status(400).json(err400("uraian tidak boleh kosong"));
    } else if (nomerBukti === "" || nomerBukti === undefined) {
      return res.status(400).json(err400("nomerBukti tidak boleh kosong"));
    } else if (
      namaPerkiraanJurnal === "" ||
      namaPerkiraanJurnal === undefined
    ) {
      return res
        .status(400)
        .json(err400("namaPerkiraanJurnal tidak boleh kosong"));
    } else if (debet === "" || debet === undefined) {
      return res.status(400).json(err400("debet tidak boleh kosong"));
    } else if (kredit === "" || kredit === undefined) {
      return res.status(400).json(err400("kredit tidak boleh kosong"));
    }
    next();
  },
  aggregateDebetKredit: async (req, res, next) => {
    try {
      const resp = await Jurnal.aggregate([
        {
          $group: {
            _id: null,
            totalDebet: {
              $sum: "$debet",
            },
            totalKredit: {
              $sum: "$kredit",
            },
          },
        },
      ]);
      req.body.totalDebet = resp[0].totalDebet;
      req.body.totalKredit = resp[0].totalKredit;
      next();
    } catch (error) {
      console.log(error);
    }
  },
  aggregateForYear: async (req, res, next) => {
    try {
      const { tahun } = req.params;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            tanggalJurnal: {
              $gte: new Date(`${tahun}-01-01`),
              $lte: new Date(`${tahun}-12-31`),
            },
          },
        },
        {
          $group: {
            _id: null,
            totalDebet: {
              $sum: "$debet",
            },
            totalKredit: {
              $sum: "$kredit",
            },
          },
        },
      ]);
      req.body.totalDebet = resp[0].totalDebet;
      req.body.totalKredit = resp[0].totalKredit;
      next();
    } catch (error) {
      console.log(error);
    }
  },
  aggregateForMonth: async (req, res, next) => {
    try {
      const { tahun, bulan } = req.params;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            tanggalJurnal: {
              $gte: new Date(`${tahun}-${bulan}-01`),
              $lte: new Date(`${tahun}-${bulan}-31`),
            },
          },
        },
        {
          $group: {
            _id: null,
            totalDebet: {
              $sum: "$debet",
            },
            totalKredit: {
              $sum: "$kredit",
            },
          },
        },
      ]);
      req.body.totalDebet = resp[0].totalDebet;
      req.body.totalKredit = resp[0].totalKredit;
      next();
    } catch (error) {
      console.log(error);
    }
  },
  aggregateForDate: async (req, res, next) => {
    try {
      const { tahun, bulan, hari } = req.params;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            tanggalJurnal: new Date(`${tahun}-${bulan}-${hari}`),
          },
        },
        {
          $group: {
            _id: null,
            totalDebet: {
              $sum: "$debet",
            },
            totalKredit: {
              $sum: "$kredit",
            },
          },
        },
      ]);
      req.body.totalDebet = resp[0].totalDebet;
      req.body.totalKredit = resp[0].totalKredit;
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
