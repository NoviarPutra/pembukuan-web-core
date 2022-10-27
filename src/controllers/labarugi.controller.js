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

  findMonth: async (req, res) => {
    try {
      const { tahun, bulan } = req.params;
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

      var startDate = `${tahun}-${bulan}-01`;
      var endDate = `${tahun}-${bulan}-31`;
      var resultProductData = resp.filter(
        (data) => {
            return(moment(data._id.tanggalJurnal).format('YYYY-MM-DD') > startDate &&
             moment(data._id.tanggalJurnal).format('YYYY-MM-DD') < endDate);
        }
        );
      
        const data =  resultProductData.aggregate([
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
      console.log(data)

        return res.status(200).json({
          code: 200,
          status: "OK",
          data: resultProductData
        });

    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },

  findYear: async (req, res) => {
    try {
      // const { totalDebet, totalKredit } = req.body;
      const { tahun } = req.params;
      const { totalDebet, totalKredit, saldo } = req.body;
      const resp = await Labarugi.aggregate([
        {
          $match: {
            tanggalLabaRugi: {
              $gte: new Date(`${tahun}-01-01`),
              $lte: new Date(`${tahun}-12-31`),
            },
          },
        },
      ]);
      if (resp[0])
        return res.status(200).json({
          code: 200,
          status: "OK",
          totalDebet: totalDebet,
          totalKredit: totalKredit,
          saldo: saldo,
          data: resp,
        });
      return res.status(400).json(err400("Tahun yang dicari kaga ada bang "));
      // totalDebet: totalDebet,
      // totalKredit: totalKredit,
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
};
