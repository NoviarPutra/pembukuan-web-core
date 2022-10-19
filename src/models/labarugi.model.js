const { Labarugi } = require("./schema");

// {
//   "nomorReferensi": "8080",
//   "referensi": 
// }
// new LabaRugi(data)

module.exports = {
  insertlabarugi: (data) => {
    return new Promise((resolve, reject) => {
      Labarugi(data).save((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      Labarugi.find((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  getByParams: (kode) => {
    return new Promise((resolve, reject) => {
      Labarugi.findOne(kode, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  updatedata: (id, data) => {
    return new Promise((resolve, reject) => {
      Labarugi.findOneAndUpdate(id, data, (err, result) => {
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
      Labarugi.findOneAndRemove(id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};