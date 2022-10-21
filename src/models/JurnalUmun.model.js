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

  getByParams: (kode) => {
    return new Promise((resolve, reject) => {
      Jurnal.findOne(kode, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  updatedata: (id, data) => {
    return new Promise((resolve, reject) => {
      Jurnal.findOneAndUpdate(id, data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deletedata: (id) => {
    return new Promise((resolve, reject) => {
      Jurnal.findOneAndRemove(id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};
