import mongoose from "mongoose";

const Schema = mongoose.Schema;

const perkiraanSchema = Schema({
  kode_perkiraan: {
    type: String,
    unique: true,
    required: true,
  },
  nama_perkiraan: {
    type: String,
    unique: true,
  },
  kelompok_akun: {
    type: String,
    required: true,
  },
  kelompok_laporan: {
    type: String,
    required: true,
    default: "NERACA",
  },
});
perkiraanSchema.set("timestamps", true);

const Perkiraan = mongoose.model("Perkiraan", perkiraanSchema);

export { Perkiraan };
