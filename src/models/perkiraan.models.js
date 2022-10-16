const { Perkiraan } = require("./schema");

module.exports = {
  insertPerkiraan: (data) => {
    return new Promise((resolve, reject) => {
      Perkiraan(data).save((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      Perkiraan.find((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  getByKode: (kode) => {
    return new Promise((resolve, reject) => {
      Perkiraan.findOne(kode, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  search: (query) => {},
  update: (kode) => {},
  remove: (kode) => {},
};
