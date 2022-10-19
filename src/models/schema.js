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


const REFERENSI_TABEL = {
  JURNAL_UMUM: 'jurnal-umum',


}

const LabaRugiSchema = Schema(
  {
    tanggalLabaRugi : Date,
    kodePerkiraan : String,
    kodeRefensi : String,
    jenisReferensi : String,
    lbDebet : Number,
    lbKredit : Number

  }
)


perkiraanSchema.set("timestamps", true);
JurnalUmunSchema.set("timestamp", true);

const Perkiraan = mongoose.model("Perkiraan", perkiraanSchema);
const Jurnal = mongoose.model("jurnalUmum", JurnalUmunSchema);


module.exports = { Perkiraan, Jurnal, REFERENSI_TABEL, LabaRugi } ;
