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
  search: (query, limit) => {
    return new Promise((resolve, reject) => {
      Perkiraan.find(query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      }).limit(limit ? limit : 10);
    });
  },
  update: (kode, data) => {
    return new Promise((resolve, reject) => {
      Perkiraan.findOneAndUpdate(kode, data, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  remove: (kode) => {
    return new Promise((resolve, reject) => {
      Perkiraan.findOneAndRemove(kode, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};
