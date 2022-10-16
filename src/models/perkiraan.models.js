import { Perkiraan } from "./schema.js";

export const insertPerkiraan = (data) => {
  return new Promise((resolve, reject) => {
    Perkiraan(data).save((err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
export const getAll = () => {
  return new Promise((resolve, reject) => {
    Perkiraan.find((err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
export const getByKode = (kode) => {
  return new Promise((resolve, reject) => {
    Perkiraan.findOne(kode, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const search = (query) => {};
export const update = (kode) => {};
export const remove = (kode) => {};
