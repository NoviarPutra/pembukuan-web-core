const { getAllLabarugi } = require("../models/labarugi.model");
const { Labarugi, Jurnal } = require("../models/schema");
const {
  success201,
  err400,
  success200,
  err404,
} = require("../helpers/messages");
const { getAll } = require("../models/JurnalUmun.model");
const moment = require("moment")

module.exports = {


  getAlldata : async(req, res) => {
    try {
      const resp = await Jurnal.aggregate([
        {
          $match: { kodePerkiraan: { $gte: "600", $lte: "799" } },
        },
        {
          $group: {
            _id: {
              tanggalJurnal: "$tanggalJurnal",
              kodePerkiraan: "$kodePerkiraan",
              namaPerkiraan: "$namaPerkiraanJurnal",
            },
            debet: { $sum: "$debet" },
            kredit: { $sum: "$kredit" },
          },
        },
      ]).sort({ _id: "asc" });
      const total = await Jurnal.aggregate([
        {
          $match: { kodePerkiraan: { $gte: "600", $lte: "799" } },
        },
        {
          $group: {
            _id: null,
            debet: { $sum: "$debet" },
            kredit: { $sum: "$kredit" },
          },
        },
      ]);
      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: total[0].debet,
        totalKredit: total[0].kredit,
        totalSaldo: total[0].debet - total[0].kredit,
        data: resp,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error));
    }
    // try {
    //   const { totalDebet, totalKredit, saldo } = req.body;
    //   const data = await getAll()
    //   // console.log(data);
    //   const filterData = data.filter((dataJurnal) => dataJurnal.kodePerkiraan < 799 && dataJurnal.kodePerkiraan > 600).map((data) => ({
    //     "tanggalLabaRugi" : data.tanggalJurnal,
    //     "kodePerkiraan" : data.kodePerkiraan,
    //     "NamaPerkiraan" : data.namaPerkiraanJurnal,
    //     "Debet" : data.debet,
    //     "Kredit" : data.kredit,
    //   }))
    //   // console.log(filterData)

    //   return res.status(200).json({
    //     code: 200,
    //     status: "OK",
    //     totalDebet: totalDebet,
    //     totalKredit: totalKredit,
    //     saldo : saldo,
    //     data: filterData,
    //   });
    // } catch {
    //   res.status(400).json(err400(error));
    // }

  },

  FindDate: async (req, res) => {
    try {
      const { tahun, bulan, hari } = req.params;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-${bulan}-${hari}`),
                  $lte: new Date(`${tahun}-${bulan}-${hari}`),
                },
              },
              { kodePerkiraan: { $gte: "600", $lte: "799" } },
            ],
          },
        },
        {
          $group: {
            _id: {
              tanggalJurnal: "$tanggalJurnal",
              kodePerkiraan: "$kodePerkiraan",
              namaPerkiraan: "$namaPerkiraanJurnal",
            },
            debet: { $sum: "$debet" },
            kredit: { $sum: "$kredit" },
          },
        },
      ]).sort({ _id: "asc" });
      const total = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-${bulan}-${hari}`),
                  $lte: new Date(`${tahun}-${bulan}-${hari}`),
                },
              },
              { kodePerkiraan: { $gte: "600", $lte: "799" } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            debet: { $sum: "$debet" },
            kredit: { $sum: "$kredit" },
          },
        },
      ]);
      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: total[0].debet,
        totalKredit: total[0].kredit,
        totalSaldo: total[0].debet - total[0].kredit,
        data: resp,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error));
    }
  },

  FindMonth: async (req, res) => {
    try {
      const { tahun, bulan } = req.params;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-${bulan}-01`),
                  $lte: new Date(`${tahun}-${bulan}-31`),
                },
              },
              { kodePerkiraan: { $gte: "600", $lte: "799" } },
            ],
          },
        },
        {
          $group: {
            _id: {
              tanggalJurnal: "$tanggalJurnal",
              kodePerkiraan: "$kodePerkiraan",
              namaPerkiraan: "$namaPerkiraanJurnal",
            },
            debet: { $sum: "$debet" },
            kredit: { $sum: "$kredit" },
          },
        },
      ]).sort({ _id: "asc" });
      const total = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-${bulan}-01`),
                  $lte: new Date(`${tahun}-${bulan}-31`),
                },
              },
              { kodePerkiraan: { $gte: "600", $lte: "799" } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            debet: { $sum: "$debet" },
            kredit: { $sum: "$kredit" },
          },
        },
      ]);
      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: total[0].debet,
        totalKredit: total[0].kredit,
        totalSaldo: total[0].debet - total[0].kredit,
        data: resp,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error));
    }
  },

  FindYear: async (req, res) => {
    try {
      const { tahun } = req.params;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-01-01`),
                  $lte: new Date(`${tahun}-12-31`),
                },
              },
              { kodePerkiraan: { $gte: "600", $lte: "799" } },
            ],
          },
        },
        {
          $group: {
            _id: {
              tanggalJurnal: "$tanggalJurnal",
              kodePerkiraan: "$kodePerkiraan",
              namaPerkiraan: "$namaPerkiraanJurnal",
            },
            debet: { $sum: "$debet" },
            kredit: { $sum: "$kredit" },
          },
        },
      ]).sort({ _id: "asc" });
      const total = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-01-01`),
                  $lte: new Date(`${tahun}-12-31`),
                },
              },
              { kodePerkiraan: { $gte: "600", $lte: "799" } },
            ],
          },
        },
        {
          $group: {
            _id: null,
            debet: { $sum: "$debet" },
            kredit: { $sum: "$kredit" },
          },
        },
      ]);
      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: total[0].debet,
        totalKredit: total[0].kredit,
        totalSaldo: total[0].debet - total[0].kredit,
        data: resp,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error));
    }
  }
};

