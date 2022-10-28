const { Jurnal } = require("../models/schema");

const {
  success201,
  err400,
  success200,
  err404,
} = require("../helpers/messages");
const {
  insertJurnal,
  getAll,
  updatedata,
  deletedata,
  getByParams,
  matchBy,
  matchAndGroupBy,
} = require("../models/JurnalUmun.model");

module.exports = {
  CreateJurnal: async (req, res) => {
    try {
      const resp = await insertJurnal(req.body);
      return res.status(201).json(success201(resp));
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  getAlldata: async (req, res) => {
    try {
      const { totalDebet, totalKredit } = req.body;
      const data = await getAll();
      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: totalDebet,
        totalKredit: totalKredit,
        data: data,
      });
    } catch (error) {
      res.status(400).json(err400(error));
    }
  },
  getdatabykode: async (req, res) => {
    try {
      const id = req.params.nomerBukti;
      const data = await Jurnal.find({ kodePerkiraan: id });
      if (data) return res.status(200).json(success200(data));
      return res.status(404).json(err404());
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  findDate: async (req, res) => {
    try {
      const { tahun, bulan, hari } = req.params;
      const DATE = `${tahun}-${bulan}-${hari}`;

      // FIND
      const resp = await matchBy({ tanggalJurnal: new Date(DATE) });

      // HANDLE NOT FOUND
      if (!resp[0]) {
        return res
          .status(404)
          .json(err404("Tahun / Bulan / Tanggal yang dicari kaga ada bang "));
      }

      // HANDLE TOTAL
      const total = await matchAndGroupBy(
        { tanggalJurnal: new Date(DATE) },
        {
          _id: null,
          totalDebet: { $sum: "$debet" },
          totalKredit: { $sum: "$kredit" },
        }
      );
      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: total[0].totalDebet,
        totalKredit: total[0].totalKredit,
        saldo: total[0].totalDebet - total[0].totalKredit,
        data: resp,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  findMonth: async (req, res) => {
    try {
      const { tahun, bulan } = req.params;
      const DATE = {
        $gte: new Date(`${tahun}-${bulan}-01`),
        $lte: new Date(`${tahun}-${bulan}-31`),
      };

      // FIND
      const resp = await matchBy({ tanggalJurnal: DATE });

      // HANDLE NOT FOUND
      if (!resp[0]) {
        return res
          .status(404)
          .json(err404("Tahun / Bulan / Tanggal yang dicari kaga ada bang "));
      }

      // HANDLE TOTAL
      const total = await matchAndGroupBy(
        { tanggalJurnal: DATE },
        {
          _id: null,
          totalDebet: { $sum: "$debet" },
          totalKredit: { $sum: "$kredit" },
        }
      );

      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: total[0].totalDebet,
        totalKredit: total[0].totalKredit,
        saldo: total[0].totalDebet - total[0].totalKredit,
        data: resp,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  findYear: async (req, res) => {
    try {
      const { tahun } = req.params;
      const DATE = {
        $gte: new Date(`${tahun}-01-01`),
        $lte: new Date(`${tahun}-12-31`),
      };

      // FIND
      const resp = await matchBy({ tanggalJurnal: DATE });

      // HANDLE NOT FOUND
      if (!resp[0]) {
        return res
          .status(404)
          .json(err404("Tahun / Bulan / Tanggal yang dicari kaga ada bang "));
      }

      // HANDLE TOTAL
      const total = await matchAndGroupBy(
        { tanggalJurnal: DATE },
        {
          _id: null,
          totalDebet: { $sum: "$debet" },
          totalKredit: { $sum: "$kredit" },
        }
      );

      return res.status(200).json({
        code: 200,
        status: "OK",
        totalDebet: total[0].totalDebet,
        totalKredit: total[0].totalKredit,
        saldo: total[0].totalDebet - total[0].totalKredit,
        data: resp,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  updatejurnal: async (req, res) => {
    try {
      let update = await updatedata({ _id: req.params._id }, req.body);
      if (update) return res.status(200).json(success200(req.body));
      return res.status(404).json(err404("ID tidak ditemukan"));
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
  deletejurnal: async (req, res) => {
    try {
      let hapus = await getByParams({ _id: req.params._id });
      if (!hapus) {
        return res.status(404).json(err404("nomer jurnal tidak ditemukan."));
      }
      await deletedata({ _id: req.params._id });
      return res.sendStatus(204);
    } catch (error) {
      return res.status(400).json(err400(error));
    }
  },
};
