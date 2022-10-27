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
  getByParams: (nomerBukti) => {
    return new Promise((resolve, reject) => {
      Jurnal.findOne(nomerBukti, (err, result) => {
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
  matchBy: (match) => {
    return new Promise((resolve, reject) => {
      Jurnal.aggregate([{ $match: match }], (err, result) => {
        if (err) reject(err);
        resolve(result);
      }).sort({ tanggalJurnal: "asc" });
    });
  },
  matchAndGroupBy: (match, group) => {
    return new Promise((resolve, reject) => {
      Jurnal.aggregate(
        [{ $match: match }, { $group: group }],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  },
};
