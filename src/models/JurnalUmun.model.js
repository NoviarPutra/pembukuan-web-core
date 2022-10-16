const { Jurnal } = require("./schema");

module.exports = {
  insertJurnal: (data) => {
    return new Promise((resolve, reject) => {
      Jurnal(data).save((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      Jurnal.find((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  getByKode: (kode) => {
    return new Promise((resolve, reject) => {
      Jurnal.findOne(kode, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};
