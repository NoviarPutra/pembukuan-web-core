const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
});

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

const JurnalUmunSchema = Schema(
  {
    nomerJurnal: {
      type: Number,
      required: true,
    },
    tanggalJurnal: Date,
    uraian: {
      type: String,
      required: true,
    },
    nomerBukti: {
      type: String,
      require: true,
    },
    kodePerkiraan: {
      type: String,
      required: true,
    },
    namaPerkiraanJurnal: {
      type: String,
      required: true,
    },
    debet: {
      type: Number,
      required: true,
      default: 0,
    },
    kredit: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { versionKey: false }
);

const LabaRugiSchema = Schema({
  tanggalLabaRugi: Date,
  kodePerkiraan: String,
  lbDebet: Number,
  lbKredit: Number,
});

userSchema.set("timestamps", true);
perkiraanSchema.set("timestamps", true);
JurnalUmunSchema.set("timestamp", true);
LabaRugiSchema.set("timestamp", true);

const User = mongoose.model("User", userSchema);
const Perkiraan = mongoose.model("Perkiraan", perkiraanSchema);
const Jurnal = mongoose.model("jurnalUmum", JurnalUmunSchema);
const Labarugi = mongoose.model("Labarugi", LabaRugiSchema);

module.exports = { User, Perkiraan, Jurnal, Labarugi };
