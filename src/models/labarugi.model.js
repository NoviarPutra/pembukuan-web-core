const { Jurnal } = require("./schema");

module.exports = {
  matchBy: (match) => {
    return new Promise((resolve, reject) => {
      Jurnal.aggregate([{ $match: match }], (err, result) => {
        if (err) reject(err);
        resolve(result);
      }).sort({ _id: "asc" });
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
