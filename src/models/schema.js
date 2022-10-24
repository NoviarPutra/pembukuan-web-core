const mongoose = require("mongoose");
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



const LabaRugiSchema = Schema(
  {
    tanggalLabaRugi : Date,
    kodePerkiraan : String,
    lbDebet : Number,
    lbKredit : Number

  }
)

const ArusKasSchema = Schema (
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
    saldo: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { versionKey: false }
)




perkiraanSchema.set("timestamps", true);
JurnalUmunSchema.set("timestamp", true);
LabaRugiSchema.set("timestamp", true);
ArusKasSchema.set("timestamp", true);

const Perkiraan = mongoose.model("Perkiraan", perkiraanSchema);
const Jurnal = mongoose.model("jurnalUmum", JurnalUmunSchema);
const Labarugi = mongoose.model("Labarugi", LabaRugiSchema);
const Aruskas = mongoose.model("arusKas", ArusKasSchema);


module.exports = { Perkiraan, Jurnal, Labarugi , Aruskas } ;
