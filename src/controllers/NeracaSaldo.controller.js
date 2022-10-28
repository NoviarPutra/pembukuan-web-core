const { Jurnal } = require("../models/schema");
const { err400, err404 } = require("../helpers/messages");

module.exports = {
  getAlldataNeracaSaldo: async (req, res) => {
    try {
      const resp = await Jurnal.aggregate([
        {
          $match: {
            kodePerkiraan: {
              $gte: "100",
              $lte: "799",
            },
          },
        },
        {
          $group: {
            _id: {
              kodePerkiraan: "$kodePerkiraan",
              namaPerkiraan: "$namaPerkiraanJurnal",
            },
            Debet: {
              $sum: "$debet",
            },
            Kredit: {
              $sum: "$kredit",
            },
          },
        },
      ]);
      const totalResp = await Jurnal.aggregate([
        {
          $match: {
            kodePerkiraan: {
              $gte: "100",
              $lte: "799",
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
      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: totalResp[0].totalDebet,
        totalKredit: totalResp[0].totalKredit,
        Saldo: totalResp[0].totalDebet - totalResp[0].totalKredit,
        data: resp,
      });
    } catch (error) {
      res.status(400).json(err400(error));
    }
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
              { kodePerkiraan: { $gte: "100", $lte: "799" } },
            ],
          },
        },
        {
          $group: {
            _id: {
              kodePerkiraan: "$kodePerkiraan",
              namaPerkiraan: "$namaPerkiraanJurnal",
            },
            Debet: {
              $sum: "$debet",
            },
            Kredit: {
              $sum: "$kredit",
            },
          },
        },
      ]).sort({ _id: "asc" });
      if (!resp[0]) return res.status(404).json(err404());

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
              { kodePerkiraan: { $gte: "100", $lte: "799" } },
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
        Saldo: total[0].debet - total[0].kredit,
        data: resp,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error));
    }
  },

  FindMount: async (req, res) => {
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
              { kodePerkiraan: { $gte: "100", $lte: "799" } },
            ],
          },
        },
        {
          $group: {
            _id: {
              kodePerkiraan: "$kodePerkiraan",
              namaPerkiraan: "$namaPerkiraanJurnal",
            },
            Debet: {
              $sum: "$debet",
            },
            Kredit: {
              $sum: "$kredit",
            },
          },
        },
      ]).sort({ _id: "asc" });
      if (!resp[0]) return res.status(404).json(err404());

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
              { kodePerkiraan: { $gte: "100", $lte: "799" } },
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
        Saldo: total[0].debet - total[0].kredit,
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
              { kodePerkiraan: { $gte: "100", $lte: "799" } },
            ],
          },
        },
        {
          $group: {
            _id: {
              kodePerkiraan: "$kodePerkiraan",
              namaPerkiraan: "$namaPerkiraanJurnal",
            },
            Debet: {
              $sum: "$debet",
            },
            Kredit: {
              $sum: "$kredit",
            },
          },
        },
      ]).sort({ _id: "asc" });
      if (!resp[0]) return res.status(404).json(err404());

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
              { kodePerkiraan: { $gte: "100", $lte: "799" } },
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
        Saldo: total[0].debet - total[0].kredit,
        data: resp,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error));
    }
  },
};
