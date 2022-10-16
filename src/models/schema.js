var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/accounting");

exports.JurnalUmunSchema = mongoose.model("jurnalUmun", {
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
    }
},  
{ versionKey: false })