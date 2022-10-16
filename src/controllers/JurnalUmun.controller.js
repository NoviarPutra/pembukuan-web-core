const { insertJurnal } = require("../models/JurnalUmun.model");
module.exports = {
  CreateJurnal: async (req, res) => {
    try {
      await insertJurnal(req.body).save();
      return res.status(201).json(req.body);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
