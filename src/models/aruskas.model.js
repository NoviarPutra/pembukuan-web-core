const { Aruskas, Jurnal } = require("./schema");

// {
//   "nomorReferensi": "8080",
//   "referensi": 
// }
// new LabaRugi(data)

module.exports = {

  getAllaruskas: (kodePerkiraan) => {
    return new Promise((resolve, reject) => {
        Jurnal.findOne(kodePerkiraan, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  getByParamsaruskas: (kode) => {
    return new Promise((resolve, reject) => {
        Aruskas.findOne(kode, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },

  updatedataaruskas: (kodePerkiraan, data) => {
    return new Promise((resolve, reject) => {
        Aruskas.findOneAndUpdate(kodePerkiraan, data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deletedataaruskas : (id) => {
    return new Promise((resolve, reject) => {
        Aruskas.findOneAndRemove(id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
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
};