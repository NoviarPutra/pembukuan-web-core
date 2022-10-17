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

  updatedata : (kode, data ) => {
    return new Promise((resolve, reject) => {
      Jurnal.findByIdAndUpdate(kode, data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deletedata : (nomerJurnal) => {
    return new Promise((resolve, reject) => {
      Jurnal.findByIdAndRemove(nomerJurnal, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};

