const { insertJurnal } = require("../models/JurnalUmun.model");
module.exports = {
  CreateJurnal: async (req, res) => {
    try {
      const resp = await insertJurnal(req.body);
      return res
        .status(201)
        .json({ code: 201, message: "CREATED", data: resp });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
