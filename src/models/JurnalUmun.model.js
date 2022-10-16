import { Jurnal } from "./schema.js";

export const insertJurnal = (data) => {
    return new Promise((resolve, reject) => {
        Jurnal(data).save((err, result) => {
            if(err) reject(err);
            resolve(result)
        });
    });
};

export const getAll = () => {
    return new Promise((resolve, reject) => {
      Jurnal.find((err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  };

  export const getByKode = (kode) => {
    return new Promise((resolve, reject) => {
      Jurnal.findOne(kode, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  };