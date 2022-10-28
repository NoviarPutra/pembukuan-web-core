const PDFDocument = require("pdfkit");
const { err404 } = require("../helpers/messages");

const {
  genCommonHeader,
  genTitle,
  genTableDataAggre,
  genTableRowAggre,
  genResult,
} = require("../helpers/pdf.service");
const { Jurnal } = require("../models/schema");

module.exports = {
  getAllLabaRugi: async (req, res) => {
    try {
      let y = 185;
      const document = new PDFDocument({
        bufferPages: true,
        layout: "landscape",
        size: "A4",
        font: "Helvetica",
      });
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
      if (!resp[0]) {
        return res
          .status(404)
          .json(err404("Tahun / Bulan / Tanggal yang dicari kaga ada bang "));
      }
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
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=LAPORAN BUKU BESAR.pdf",
      });

      genCommonHeader(document, "PT. Lorem Ipsum");
      genTitle(document, "Laporan Laba Rugi");
      genTableRowAggre(document, 160);

      for (let i = 0; i < resp.length; i++) {
        genTableDataAggre(document, y, resp[i]);
        y += 20;
      }

      genResult(document, {
        totalDebet: total[0].debet,
        totalKredit: total[0].kredit,
        totalSaldo: total[0].debet - total[0].kredit,
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
      let y = 185;
      const document = new PDFDocument({
        bufferPages: true,
        layout: "landscape",
        size: "A4",
        font: "Helvetica",
      });
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

      if (!resp[0]) {
        return res
          .status(404)
          .json(err404("Tahun / Bulan / Tanggal yang dicari kaga ada bang "));
      }
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
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=LAPORAN BUKU BESAR.pdf",
      });

      genCommonHeader(document, "PT. Lorem Ipsum");
      genTitle(document, "Laporan Laba Rugi " + tahun);
      genTableRowAggre(document, 160);

      for (let i = 0; i < resp.length; i++) {
        genTableDataAggre(document, y, resp[i]);
        y += 20;
      }

      genResult(document, {
        totalDebet: total[0].debet,
        totalKredit: total[0].kredit,
        totalSaldo: total[0].debet - total[0].kredit,
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
      let y = 185;
      const document = new PDFDocument({
        bufferPages: true,
        layout: "landscape",
        size: "A4",
        font: "Helvetica",
      });
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

      if (!resp[0]) {
        return res
          .status(404)
          .json(err404("Tahun / Bulan / Tanggal yang dicari kaga ada bang "));
      }
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
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=LAPORAN BUKU BESAR.pdf",
      });

      genCommonHeader(document, "PT. Lorem Ipsum");
      genTitle(document, "Laporan Laba Rugi " + month[bulan - 1] + " " + tahun);
      genTableRowAggre(document, 160);

      for (let i = 0; i < resp.length; i++) {
        genTableDataAggre(document, y, resp[i]);
        y += 20;
      }

      genResult(document, {
        totalDebet: total[0].debet,
        totalKredit: total[0].kredit,
        totalSaldo: total[0].debet - total[0].kredit,
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
      let y = 185;
      const document = new PDFDocument({
        bufferPages: true,
        layout: "landscape",
        size: "A4",
        font: "Helvetica",
      });
      const { tahun, bulan, tanggal } = req.params;
      const resp = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              {
                tanggalJurnal: new Date(`${tahun}-${bulan}-${tanggal}`),
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

      if (!resp[0]) {
        return res
          .status(404)
          .json(err404("Tahun / Bulan / Tanggal yang dicari kaga ada bang "));
      }
      const total = await Jurnal.aggregate([
        {
          $match: {
            $and: [
              { tanggalJurnal: new Date(`${tahun}-${bulan}-${tanggal}`) },
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
      const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=LAPORAN BUKU BESAR.pdf",
      });

      genCommonHeader(document, "PT. Lorem Ipsum");
      genTitle(
        document,
        "Laporan Laba Rugi " + tanggal + " " + month[bulan - 1] + " " + tahun
      );
      genTableRowAggre(document, 160);

      for (let i = 0; i < resp.length; i++) {
        genTableDataAggre(document, y, resp[i]);
        y += 20;
      }

      genResult(document, {
        totalDebet: total[0].debet,
        totalKredit: total[0].kredit,
        totalSaldo: total[0].debet - total[0].kredit,
      });

      document.on("data", (data) => stream.write(data));
      document.on("end", () => stream.end());
      document.end();
    } catch (error) {
      console.log(error);
    }
  },
};
