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

const JurnalUmunSchema = Schema({
    nomerJurnal : {
        type : String,
        required: true
    },
    tanggalJurna : Date,
    uraian : {
        type : String,
        required: true
    },
    kodePerkiraan : {
        type : String,
        required: true
    },
    NamaPerkiraanJurnal : {
        type : String,
        required: true
    },
    debet : {
        type : Number,
        required: true
    },
    Kredit : {
        type : Number,
        required: true
    },
},  
{ versionKey: false });

perkiraanSchema.set("timestamps", true);
JurnalUmunSchema.set("timestamp", true);


const Perkiraan = mongoose.model("Perkiraan", perkiraanSchema);
const Jurnal = mongoose.model("jurnalUmun", JurnalUmunSchema);

export { Perkiraan, Jurnal };

