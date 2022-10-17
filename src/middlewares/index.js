const { err400 } = require("../helpers");

module.exports = {
  validateBeforeCreatePerkiraan: (req, res, next) => {
    const { kode_perkiraan, nama_perkiraan, kelompok_akun } = req.body;
    if (kode_perkiraan === "" || undefined) {
      return res.status(400).json(err400("kode_perkiraan tidak boleh kosong"));
    } else if (nama_perkiraan === "" || undefined) {
      return res.status(400).json(err400("nama_perkiraan tidak boleh kosong"));
    } else if (kelompok_akun === "" || undefined) {
      return res.status(400).json(err400("kelompok_akun tidak boleh kosong"));
    }
    next();
  },
};
