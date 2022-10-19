const { insertJurnal, getByKode, getAll, updatedata } = require("../models/JurnalUmun.model");
const { Jurnal, REFERENSI_TABEL } = require("../models/schema");


module.exports = {
  CreateJurnal:  async (req, res) => {
    try {
      // const { nomerJurnal, }
      // create jurnal sampe selesai
      // setelah selesai, panggil model laba rugi
      // buat laba rugi sesuai jurnal... save, kelar.
      
      const resp = await insertJurnal(req.body);
      return res
        .status(201)
        .json({ code: 201, message: "CREATED", data: resp });
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
    } },

    updatejurnal : async (req, res) => {
      try {
        let update = await updatedata(
          { nomerJurnal: req.params.nomerJurnal },
          req.body
        );

        if(update) return res.status(200).json(update);
        return res.status(400).json(error);
      } catch (error) {
        return res.status(400).json(error);
      }
    },

    deletejurnal : async (req, res) => {
      try {
        let hapus = await Jurnal.findOne({ nomerJurnal: req.params.nomerJurnal });
        if (!hapus) {
          return res.status(404).json({ message: "nomer jurnal tidak ditemukan." });
        }
    
        await Jurnal.findOneAndRemove({ nomerJurnal: hapus.nomerJurnal });
        return res.status(204).json({});
      } catch (error) {
        return res.status(400).json(error);
      }
    }


   };

