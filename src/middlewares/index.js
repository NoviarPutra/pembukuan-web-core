const { Jurnal, Perkiraan, Labarugi, Aruskas } = require("../models/schema");
const { body, validationResult, param } = require("express-validator");
const { err400 } = require("../helpers/messages");
const { getByKode, getByName } = require("../models/perkiraan.models");
const { getAll } = require("../models/JurnalUmun.model");
const { incrementNumber, generateNumber } = require("../helpers/generate");

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

  validateBeforeCreateJurnal: async (req, res, next) => {
    const {
      tanggalJurnal,
      uraian,
      nomerBukti,
      namaPerkiraanJurnal,
      debet,
      kredit,
    } = req.body;
    let num;
    if (tanggalJurnal === "" || tanggalJurnal === undefined) {
      return res.status(400).json(err400("tanggal tidak boleh kosong"));
    } else if (uraian === "" || uraian === undefined) {
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
    } else if (debet === 0 && kredit === 0) {
      return res
        .status(400)
        .json(err400("salah satu debet / kredit tidak boleh 0"));
    } else if (nomerBukti === 0) {
      return res.status(400).json(err400("nomer bukti harus > 0"));
    } else if (typeof nomerBukti !== "number") {
      return res.status(400).json(err400("nomer bukti harus type Number"));
    } else if (typeof debet !== "number") {
      return res.status(400).json(err400("debet harus type Number"));
    } else if (typeof kredit !== "number") {
      return res.status(400).json(err400("kredit harus type Number"));
    }

    // CHECK NAMA PERKIRAAN
    const check = await getByName({
      nama_perkiraan: namaPerkiraanJurnal.toUpperCase(),
    });

    if (!check)
      return res.status(404).json(err404("Nama Perkiraan tidak valid"));

    // CHECK NOMER JURNAL

    const checkNomer = await getAll();

    if (checkNomer[0] === undefined) {
      req.body.nomerJurnal = incrementNumber(checkNomer[0]);
      req.body.uraian = uraian.toUpperCase();
      req.body.namaPerkiraanJurnal = namaPerkiraanJurnal.toUpperCase();
      req.body.kodePerkiraan = check.kode_perkiraan;
      req.body.nomerBukti = `NB-${generateNumber(nomerBukti)}`;
      next();
    } else {
      checkNomer.reverse();
      num = incrementNumber(checkNomer[0].nomerJurnal);
      req.body.nomerJurnal = num;
      req.body.uraian = uraian.toUpperCase();
      req.body.namaPerkiraanJurnal = namaPerkiraanJurnal.toUpperCase();
      req.body.kodePerkiraan = check.kode_perkiraan;
      req.body.nomerBukti = `NB-${generateNumber(nomerBukti)}`;
      next();
    }
  },
  validateJurnalBeforeUpdate: async (req, res, next) => {
    const {
      tanggalJurnal,
      uraian,
      nomerBukti,
      namaPerkiraanJurnal,
      debet,
      kredit,
    } = req.body;
    if (tanggalJurnal === "" || tanggalJurnal === undefined) {
      return res.status(400).json(err400("tanggal tidak boleh kosong"));
    } else if (uraian === "" || uraian === undefined) {
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
    } else if (debet === 0 && kredit === 0) {
      return res
        .status(400)
        .json(err400("salah satu debet / kredit tidak boleh 0"));
    } else if (typeof debet !== "number") {
      return res.status(400).json(err400("debet harus type Number"));
    } else if (typeof kredit !== "number") {
      return res.status(400).json(err400("kredit harus type Number"));
    }

    const check = await getByName({
      nama_perkiraan: req.body.namaPerkiraanJurnal.toUpperCase(),
    });
    if (!check)
      return res.status(404).json(err404("Nama Perkiraan tidak valid"));
    req.body.uraian = req.body.uraian.toUpperCase();
    req.body.namaPerkiraanJurnal = req.body.namaPerkiraanJurnal.toUpperCase();
    req.body.kodePerkiraan = check.kode_perkiraan;
    // req.body.nomerBukti = generateNumber(req.body.nomerBukti);
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
      if (resp[0]) {
        req.body.totalDebet = resp[0].totalDebet;
        req.body.totalKredit = resp[0].totalKredit;
      }
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
      if (resp[0]) {
        req.body.totalDebet = resp[0].totalDebet;
        req.body.totalKredit = resp[0].totalKredit;
        next();
      } else {
        return res.status(400).json(err400("Tahun yang dicari kaga ada bang "));
      }
    } catch (error) {
      return res.status(400).json(err400(error));
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
      if (resp[0]) {
        req.body.totalDebet = resp[0].totalDebet;
        req.body.totalKredit = resp[0].totalKredit;
        next();
      } else {
        return res
          .status(400)
          .json(err400("Tahun / Bulan yang dicari kaga ada bang "));
      }
    } catch (error) {
      return res.status(400).json(err400(error));
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
      if (resp[0]) {
        req.body.totalDebet = resp[0].totalDebet;
        req.body.totalKredit = resp[0].totalKredit;
        next();
      } else {
        return res
          .status(400)
          .json(err400("Tahun / Bulan / Hari yang dicari kaga ada bang "));
      }
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  aggregateDebetKreditSaldo: async (req, res, next) => {
    try {
      const resp = await Labarugi.aggregate([
        {
          $group: {
            _id: null,
            totalDebet: {
              $sum: "$lbDebet",
            },
            totalKredit: {
              $sum: "$lbKredit",
            },
          },
        },
      ]);
      req.body.totalDebet = resp[0].totalDebet;
      req.body.totalKredit = resp[0].totalKredit;
      req.body.saldo = req.body.totalDebet - req.body.totalKredit;
      next();
    } catch (error) {
      console.log(error);
    }
  },
  aggregateForYearLabarugi: async (req, res, next) => {
    try {
      const { tahun } = req.params;
      const resp = await Labarugi.aggregate([
        {
          $match: {
            tanggalLabaRugi: {
              $gte: new Date(`${tahun}-01-01`),
              $lte: new Date(`${tahun}-12-31`),
            },
          },
        },
        {
          $group: {
            _id: null,
            totalDebet: {
              $sum: "$lbDebet",
            },
            totalKredit: {
              $sum: "$lbKredit",
            },
          },
        },
      ]);
      req.body.totalDebet = resp[0].totalDebet;
      req.body.totalKredit = resp[0].totalKredit;
      req.body.saldo = req.body.totalDebet - req.body.totalKredit;
      next();
    } catch (error) {
      console.log(error);
    }
  },
  aggregateForMonthLabarugi: async (req, res, next) => {
    try {
      const { tahun, bulan } = req.params;
      const resp = await Labarugi.aggregate([
        {
          $match: {
            tanggalLabaRugi: {
              $gte: new Date(`${tahun}-${bulan}-01`),
              $lte: new Date(`${tahun}-${bulan}-31`),
            },
          },
        },
        {
          $group: {
            _id: null,
            totalDebet: {
              $sum: "$lbDebet",
            },
            totalKredit: {
              $sum: "$lbKredit",
            },
          },
        },
      ]);
      req.body.totalDebet = resp[0].totalDebet;
      req.body.totalKredit = resp[0].totalKredit;
      req.body.saldo = req.body.totalDebet - req.body.totalKredit;
      next();
    } catch (error) {
      console.log(error);
    }
  },
  aggregateForDateLabarugi: async (req, res, next) => {
    try {
      const { tahun, bulan, hari } = req.params;
      const resp = await Labarugi.aggregate([
        {
          $match: {
            tanggalLabaRugi: new Date(`${tahun}-${bulan}-${hari}`),
          },
        },
        {
          $group: {
            _id: null,
            totalDebet: {
              $sum: "$lbDebet",
            },
            totalKredit: {
              $sum: "$lbKredit",
            },
          },
        },
      ]);

      req.body.totalDebet = resp[0].totalDebet;
      req.body.totalKredit = resp[0].totalKredit;
      req.body.saldo = req.body.totalDebet - req.body.totalKredit;
      next();
    } catch (error) {
      console.log(error);
    }
  },


  aggregateDebetKreditSaldoAruskas: async (req, res, next) => {
    try {
      const resp = await Aruskas.aggregate([
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
      req.body.saldo = req.body.totalDebet - req.body.totalKredit;
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
