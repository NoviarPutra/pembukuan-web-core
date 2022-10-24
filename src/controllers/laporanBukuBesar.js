const PDFDocument = require("pdfkit");
const fs = require("fs");

const { genCommonHeader } = require("../helpers/pdf.service");

const document = new PDFDocument({ size: "A4", font: "Helvetica" });

module.exports = {
  getAllLaporan: async (req, res) => {
    try {
      let buffers = [];
      const fileName = `Laporan-Buku-Besar` + new Date().getTime();
      // const writeStream = fs.createWriteStream(
      //   "./src/report/" + fileName + ".pdf"
      // );
      // res.writeHead(200, {
      //   "Content-Type": "application/pdf",
      //   "Content-disposition": "inline;filename=" + fileName,
      // });
      // document.pipe(writeStream);
      // document.pipe(res);
      genCommonHeader(document, "Laporan Buku Besar");
      document.on("data", buffers.push.bind(buffers));
      document.on(
        "end",
        () => {
          let pdfData = Buffer.concat(buffers);
          res
            .writeHead(200, {
              "Content-Length": Buffer.byteLength(pdfData),
              "Content-Type": "application/pdf",
              "Content-disposition": `attachment;filename=${fileName}.pdf`,
            })
            .end(pdfData);
        },
        (err) => console.log(err)
      );
      document.end();
      // writeStream.on("error", (err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  },
  getAllByPerkiraan: async (req, res) => {},
  getAllByYear: async (req, res) => {},
  getAllByMonth: async (req, res) => {},
  getAllByDate: async (req, res) => {},
};
