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

  getAllLabarugi: () => {
    return new Promise((resolve, reject) => {
      Labarugi.find((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  getByParamsLabarugi: (kode) => {
    return new Promise((resolve, reject) => {
      Labarugi.findOne(kode, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  updatedatalabarugi: (kodePerkiraan, data) => {
    return new Promise((resolve, reject) => {
      Labarugi.findOneAndUpdate(kodePerkiraan, data, (err, result) => {
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