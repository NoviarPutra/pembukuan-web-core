import {
  getAll,
  getByKode,
  insertPerkiraan,
} from "../models/perkiraan.models.js";

export const createPerkiraan = async (req, res) => {
  try {
    const { kode_perkiraan, nama_perkiraan, kelompok_akun } = req.body;
    const resp = await insertPerkiraan({
      kode_perkiraan: kode_perkiraan.toUpperCase(),
      nama_perkiraan: nama_perkiraan.toUpperCase(),
      kelompok_akun: kelompok_akun.toUpperCase(),
    });
    if (resp) return res.status(201).json({ code: 201, message: "CREATED" });
    return res.status(400).json({ code: 400, message: "Something went wrong" });
  } catch (error) {
    return res.status(400).json({ code: 400, message: error });
  }
};
export const getAllPerkiraan = async (req, res) => {
  try {
    const resp = await getAll();
    if (resp)
      return res.status(200).json({ code: 200, message: "OK", data: resp });
  } catch (error) {
    return res.status(400).json({ code: 400, message: error });
  }
};
export const getPerkiraanByKode = async (req, res) => {
  try {
    const id = req.params.kode_perkiraan;
    const resp = await getByKode({ kode_perkiraan: id });
    if (resp)
      return res.status(200).json({ code: 200, message: "OK", data: resp });
    return res.status(200).json({ code: 404, message: "NOT FOUND" });
  } catch (error) {
    return res.status(400).json({ code: 400, message: error });
  }
};
// export const createPerkiraan = async (req, res) => {};
// export const createPerkiraan = async (req, res) => {};
