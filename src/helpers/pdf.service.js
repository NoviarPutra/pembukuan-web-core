module.exports = {
  genCommonHeader: (doc, title) => {
    doc
      .fillColor("black")
      .fontSize(30)
      .text(title, 40, 40, { align: "center" })
      .moveDown();
    doc
      .strokeColor("black")
      .lineWidth(1)
      .moveTo(0, 80)
      .lineTo(1000, 80)
      .stroke();
  },
  genTitle: (doc, title) => {
    doc
      .fillColor("black")
      .fontSize(12)
      .text(title, 40, 100, { align: "center" })
      .moveDown();
  },
  genTableRow: (doc, y) => {
    doc
      .fontSize(10)
      .text("Nomer", 10, y)
      .text("Tanggal Jurnal", 50, y)
      .text("Uraian", 150, y)
      .text("Nomer Bukti", 330, y)
      .text("Kode Perkiraan", 420, y)
      .text("Nama Perkiraan", 520, y)
      .text("Debet", 640, y)
      .text("Kredit", 710, y, {
        width: 100,
        align: "left",
      })
      .moveDown();
  },
  genTableData: (doc, y, data) => {
    const date = data.tanggalJurnal.toString();
    const formatDate = date.split("07:00:00");
    // console.log(data.tanggalJurnal, formatDate[0]);

    doc
      .fontSize(10)
      .text(data.nomerJurnal, 10, y)
      .text(formatDate[0], 50, y)
      .text(data.uraian, 150, y)
      .text(data.nomerBukti, 330, y)
      .text(data.kodePerkiraan, 420, y)
      .text(data.namaPerkiraanJurnal, 520, y)
      .text(data.debet, 640, y)
      .text(data.kredit, 710, y)
      .moveDown();
  },
  genResult: (doc, data) => {
    doc
      .fontSize(10)
      .text("Total Debet = ", 10, 470)
      .text(data.totalDebet, 80, 470)
      .moveDown();
    doc
      .fontSize(10)
      .text("Total Kredit = ", 10, 490)
      .text(data.totalKredit, 80, 490)
      .moveDown();
    doc
      .fontSize(10)
      .text("Total Saldo = ", 10, 510)
      .text(data.totalSaldo, 80, 510)
      .moveDown();
  },
};
