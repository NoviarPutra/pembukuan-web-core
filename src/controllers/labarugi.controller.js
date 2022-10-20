const { insertlabarugi } = require("../models/labarugi.model");
const { Labarugi } = require("../models/schema");

const listLabarugi = ["705", "707", "702"];

module.exports = {
    createLabarugi : async (req, res) => {
        try {
        const checkNomer = await getAll();
            if (checkNomer[0] === undefined) {
                req.body.kodePerkiraan = check.kode_perkiraan;
                if(req.body.kodePerkiraan == listLabarugi) {
                    const {tanggalJurnal, debet, kredit} = req.body;
                    const resp = await insertlabarugi({
                        tanggalLabaRugi : tanggalJurnal,
                        lbDebet : debet,
                        lbKredit : kredit
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