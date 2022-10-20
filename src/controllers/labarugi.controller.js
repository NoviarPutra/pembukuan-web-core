const { insertlabarugi } = require("../models/labarugi.model");
const {getAll } = require("../models/JurnalUmun.model");
const { getByName } = require("../models/perkiraan.models");
const { Labarugi } = require("../models/schema");
const {
    success201,
    err400,
    success200,
    err404,
  } = require("../helpers/messages");
const listLabarugi = ["705", "707", "702"];

module.exports = {
    createLabarugi : async (req, res) => {
        try {
        const check = await getByName({
            nama_perkiraan: req.body.namaPerkiraanJurnal.toUpperCase(),
            });
        if (!check)
            return res.status(404).json(err404("Nama Perkiraan tidak valid"));
        
        const checkNomer = await getAll();
            if (checkNomer[0] === undefined) {
                req.body.kodePerkiraan = check.kode_perkiraan;
                if(req.body.kodePerkiraan == listLabarugi[0]) {
                    // const {tanggalJurnal, debet, kredit} = req.body;
                    const resp = await insertlabarugi({
                        tanggalLabaRugi : req.body.tanggalJurnal,
                        kodePerkiraan : req.body.kodePerkiraan,
                        lbDebet : req.body.debet,
                        lbKredit : req.body.kredit
                    });
                    return res.status(201).json(success201(resp));
                }
                
            } else {
                checkNomer.reverse();
                req.body.kodePerkiraan = check.kode_perkiraan;
                const resp = await insertlabarugi(req.body);
                return res.status(201).json(success201(resp));
            }
        } catch (error) {
            return res.status(400).json(err400(error));
            }
    },

    getAlldata: async (req, res) => {
        try {
          const data = await getAll();
          return res.status(200).json(success200(data));
        } catch (error) {
          res.status(400).json(err400(error));
        }
      },
}