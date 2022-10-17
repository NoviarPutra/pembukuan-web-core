const { insertJurnal, getByKode, getAll } = require("../models/JurnalUmun.model");

module.exports = {
  CreateJurnal:  async (req, res) => {
    try {
      // const { nomerJurnal, }
      const resp = await insertJurnal(req.body);
      return res.status(201).json({ code: 201, message: "CREATED" });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  getAlldata :  async (req, res) => {
    try {
      const data = await getAll();
      return res.status(201).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  },

   getdatabykode : async (req, res) => {
    try {
      const id = req.params.kodePerkiraan;
      const data = await getByKode({ kodePerkiraan: id });
      if (data)
        return res.status(200).json({ code: 200, message: "OK", data: data });
      return res.status(200).json({ code: 404, message: "NOT FOUND" });
    } catch (error) {
      return res.status(400).json({ code: 400, message: error });
    }
   }
};
