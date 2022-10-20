const { insertlabarugi, getAllLabarugi } = require("../models/labarugi.model");
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
            // const {tanggalJurnal, debet, kredit} = req.body;
            const resp = await insertlabarugi({
                tanggalLabaRugi : req.body.tanggalJurnal,
                kodePerkiraan : req.body.kodePerkiraan,
                lbDebet : req.body.debet,
                lbKredit : req.body.kredit
                 });
            return res.status(201).json(success201(resp));
        } catch (error) {
            return res.status(400).json(err400(error));
            }
    },

    getAlldata: async (req, res) => {
        try {
          const data = await getAllLabarugi();
          return res.status(200).json(success200(data));
        } catch (error) {
          res.status(400).json(err400(error));
        }
      },
}