const { User } = require("./schema");

module.exports = {
  insertUser: (payload) => {
    return new Promise((resolve, reject) => {
      User(payload).save((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      User.find((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  findBy: (params) => {
    return new Promise((resolve, reject) => {
      User.findOne(params, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  updateBy: (params, data) => {
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate(params, data, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  removeBy: (params) => {
    return new Promise((resolve, reject) => {
      User.findOneAndRemove(params, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};
