module.exports = {
  genCommonHeader: (doc, title) => {
    doc
      .fillColor("#444444")
      .fontSize(30)
      .text(title, 40, 40, { align: "center" })
      .moveDown();
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(0, 80)
      .lineTo(1000, 80)
      .stroke();
  },
};
