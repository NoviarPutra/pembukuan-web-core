const { Aruskas, Jurnal} = require("../models/schema");
const {
  success201,
  err400,
  success200,
  err404,
} = require("../helpers/messages");
const { getAll } = require("../models/JurnalUmun.model");


module.exports = {

  getAlldataNeraca : async (req, res) => {
    try {
      const resp = await Jurnal.aggregate([
        {
          $match: {
            kodePerkiraan: {
              $gte: "100",
              $lte: "599",
            },
          },
        },
        {
          $group: {
            _id: {
              tanggalJurnal: "$tanggalJurnal",
              kodePerkiraan: "$kodePerkiraan",
              namaPerkiraan: "$namaPerkiraanJurnal",
            },
            Debet: {
              $sum : "$debet",
            },
            Kredit: {
              $sum : "$kredit",
            },
          },
        },
      ]);
      const totalResp = await Jurnal.aggregate([
        {
          $match: {
            kodePerkiraan: {
              $gte: "100",
              $lte: "599",
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
        saldo: totalResp[0].totalDebet - totalResp[0].totalKredit,
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
              { kodePerkiraan: { $gte: "100", $lte: "599" } },
      
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
            Debet: {
              $sum : "$debet",
            },
            Kredit: {
              $sum : "$kredit",
            },
          },
        },
      ]);
      const totalResp = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-${bulan}-${hari}`),
                  $lte: new Date(`${tahun}-${bulan}-${hari}`),
                },
              },
              { kodePerkiraan: { $gte: "100", $lte: "599" } },
      
            ],
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
        saldo: totalResp[0].totalDebet - totalResp[0].totalKredit,
        data: resp,
      });
    } catch (error) {
      res.status(400).json(err400(error));
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
              { kodePerkiraan: { $gte: "100", $lte: "799" } },
      
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
            Debet: {
              $sum : "$debet",
            },
            Kredit: {
              $sum : "$kredit",
            },
          },
        },
      ]);
      const totalResp = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-${bulan}-01`),
                  $lte: new Date(`${tahun}-${bulan}-31`),
                },
              },
              { kodePerkiraan: { $gte: "100", $lte: "599" } },
      
            ],
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
        saldo: totalResp[0].totalDebet - totalResp[0].totalKredit,
        data: resp,
      });
    } catch (error) {
      res.status(400).json(err400(error));
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
              { kodePerkiraan: { $gte: "100", $lte: "599" } },
      
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
            Debet: {
              $sum : "$debet",
            },
            Kredit: {
              $sum : "$kredit",
            },
          },
        },
      ]);
      const totalResp = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: {
                  $gte: new Date(`${tahun}-01-01`),
                  $lte: new Date(`${tahun}-12-31`),
                },
              },
              { kodePerkiraan: { $gte: "100", $lte: "599" } },
      
            ],
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
        saldo: totalResp[0].totalDebet - totalResp[0].totalKredit,
        data: resp,
      });
    } catch (error) {
      res.status(400).json(err400(error));
    }
  },
 


  
};
