const PDFDocument = require("pdfkit");
const { err404 } = require("../helpers/messages");

const {
  genCommonHeader,
  genTitle,
  genTableRow,
  genTableData,
  genResult,
} = require("../helpers/pdf.service");
const {
  getAll,
  matchBy,
  matchAndGroupBy,
} = require("../models/JurnalUmun.model");
const { Jurnal } = require("../models/schema");

module.exports = {
  getAllLaporan: async (req, res) => {
    try {
      const { totalDebet, totalKredit } = req.body;
      let y = 185;
      const document = new PDFDocument({
        bufferPages: true,
        layout: "landscape",
        size: "A4",
        font: "Helvetica",
      });
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=LAPORAN BUKU BESAR.pdf",
      });
      const resp = await getAll();
      genCommonHeader(document, "PT. Lorem Ipsum");
      genTitle(document, "Laporan Buku Besar");
      genTableRow(document, 160);

      for (let i = 0; i < resp.length; i++) {
        genTableData(document, y, resp[i]);
        y += 20;
      }

      genResult(document, {
        totalDebet: totalDebet,
        totalKredit: totalKredit,
        Saldo: totalDebet - totalKredit,
      });

      document.on("data", (data) => stream.write(data));
      document.on("end", () => stream.end());
      document.end();
    } catch (error) {
      console.log(error);
    }
  },
  getAllByPerkiraan: async (req, res) => {
    try {
      const kode = req.params.kode;
      console.log(kode);
      let y = 185;
      const document = new PDFDocument({
        bufferPages: true,
        layout: "landscape",
        size: "A4",
        font: "Helvetica",
      });
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=LAPORAN BUKU BESAR.pdf",
      });
      const resp = await Jurnal.find({ kodePerkiraan: kode });
      const total = await Jurnal.aggregate([
        { $match: { kodePerkiraan: kode } },
        {
          $group: {
            _id: null,
            totalDebet: { $sum: "$debet" },
            totalKredit: { $sum: "$kredit" },
          },
        },
      ]);
      genCommonHeader(document, "PT. Lorem Ipsum");
      genTitle(document, "Laporan Buku Besar By Nama Perkiraan");
      genTableRow(document, 160);

      for (let i = 0; i < resp.length; i++) {
        genTableData(document, y, resp[i]);
        y += 20;
      }

      genResult(document, {
        totalDebet: total[0].totalDebet,
        totalKredit: total[0].totalKredit,
        Saldo: total[0].totalDebet - total[0].totalKredit,
      });

      document.on("data", (data) => stream.write(data));
      document.on("end", () => stream.end());
      document.end();
    } catch (error) {
      console.log(error);
    }
  },
  getAllByYear: async (req, res) => {
    try {
      const { tahun } = req.params;
      const DATE = {
        $gte: new Date(`${tahun}-01-01`),
        $lte: new Date(`${tahun}-12-31`),
      };
      const resp = await matchBy({ tanggalJurnal: DATE });

      if (!resp[0]) {
        return res
          .status(404)
          .json(err404("Tahun / Bulan / Tanggal yang dicari kaga ada bang "));
      }
      const total = await matchAndGroupBy(
        { tanggalJurnal: DATE },
        {
          _id: null,
          totalDebet: { $sum: "$debet" },
          totalKredit: { $sum: "$kredit" },
        }
      );
      let y = 185;
      const document = new PDFDocument({
        bufferPages: true,
        layout: "landscape",
        size: "A4",
        font: "Helvetica",
      });
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=LAPORAN BUKU BESAR.pdf",
      });

      genCommonHeader(document, "PT. Lorem Ipsum");
      genTitle(document, "Laporan Buku Besar " + tahun);
      genTableRow(document, 160);

      for (let i = 0; i < resp.length; i++) {
        genTableData(document, y, resp[i]);
        y += 20;
      }

      genResult(document, {
        totalDebet: total[0].totalDebet,
        totalKredit: total[0].totalKredit,
        Saldo: total[0].totalDebet - total[0].totalKredit,
      });

      document.on("data", (data) => stream.write(data));
      document.on("end", () => stream.end());
      document.end();
    } catch (error) {
      console.log(error);
    }
  },
  getAllByMonth: async (req, res) => {
    try {
      const { tahun, bulan } = req.params;
      const month = [
        "Januari",
        "Februrari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      const DATE = {
        $gte: new Date(`${tahun}-${bulan}-01`),
        $lte: new Date(`${tahun}-${bulan}-31`),
      };
      const resp = await matchBy({ tanggalJurnal: DATE });

      if (!resp[0]) {
        return res
          .status(404)
          .json(err404("Tahun / Bulan / Tanggal yang dicari kaga ada bang "));
      }
      const total = await matchAndGroupBy(
        { tanggalJurnal: DATE },
        {
          _id: null,
          totalDebet: { $sum: "$debet" },
          totalKredit: { $sum: "$kredit" },
        }
      );
      let y = 185;
      const document = new PDFDocument({
        bufferPages: true,
        layout: "landscape",
        size: "A4",
        font: "Helvetica",
      });
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=LAPORAN BUKU BESAR.pdf",
      });

      genCommonHeader(document, "PT. Lorem Ipsum");
      genTitle(
        document,
        "Laporan Buku Besar " + month[bulan - 1] + " " + tahun
      );
      genTableRow(document, 160);

      for (let i = 0; i < resp.length; i++) {
        genTableData(document, y, resp[i]);
        y += 20;
      }

      genResult(document, {
        totalDebet: total[0].totalDebet,
        totalKredit: total[0].totalKredit,
        totalSaldo: total[0].totalDebet - total[0].totalKredit,
      });

      document.on("data", (data) => stream.write(data));
      document.on("end", () => stream.end());
      document.end();
    } catch (error) {
      console.log(error);
    }
  },
  getAllByDate: async (req, res) => {
    try {
      const { tahun, bulan, tanggal } = req.params;
      const month = [
        "Januari",
        "Februrari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      const DATE = new Date(`${tahun}-${bulan}-${tanggal}`);

      const resp = await matchBy({ tanggalJurnal: DATE });

      if (!resp[0]) {
        return res
          .status(404)
          .json(err404("Tahun / Bulan / Tanggal yang dicari kaga ada bang "));
      }
      const total = await matchAndGroupBy(
        { tanggalJurnal: DATE },
        {
          _id: null,
          totalDebet: { $sum: "$debet" },
          totalKredit: { $sum: "$kredit" },
        }
      );
      let y = 185;
      const document = new PDFDocument({
        bufferPages: true,
        layout: "landscape",
        size: "A4",
        font: "Helvetica",
      });
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=LAPORAN BUKU BESAR.pdf",
      });

      genCommonHeader(document, "PT. Lorem Ipsum");
      genTitle(
        document,
        "Laporan Buku Besar " + tanggal + " " + month[bulan - 1] + " " + tahun
      );
      genTableRow(document, 160);

      for (let i = 0; i < resp.length; i++) {
        genTableData(document, y, resp[i]);
        y += 20;
      }

      genResult(document, {
        totalDebet: total[0].totalDebet,
        totalKredit: total[0].totalKredit,
        Saldo: total[0].totalDebet - total[0].totalKredit,
      });

      document.on("data", (data) => stream.write(data));
      document.on("end", () => stream.end());
      document.end();
    } catch (error) {
      console.log(error);
    }
  },
};
