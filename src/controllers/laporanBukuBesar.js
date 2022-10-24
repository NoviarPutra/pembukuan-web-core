const PDFDocument = require("pdfkit");
const fs = require("fs");

const { genCommonHeader } = require("../helpers/pdf.service");

const document = new PDFDocument({ size: "A4", font: "Helvetica" });

module.exports = {
  getAllLaporan: async (req, res) => {
    try {
      const fileName = `Laporan-Buku-Besar` + new Date().getTime();
      const writeStream = fs.createWriteStream(
        "./src/report/" + fileName + ".pdf"
      );
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-disposition": "inline;filename=" + fileName,
      });
      document.pipe(writeStream);
      document.pipe(res);
      genCommonHeader(document, "Laporan Buku Besar");
      // document.on("data", (data) => {
      //   stream.write(data);
      // });
      // document.on("end", () => stream.end());
      document.end();
      writeStream.on("error", (err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  },
  getAllByPerkiraan: async (req, res) => {},
  getAllByYear: async (req, res) => {},
  getAllByMonth: async (req, res) => {},
  getAllByDate: async (req, res) => {},
};
