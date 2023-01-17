const mongoose = require("mongoose");
const DemandeSchema = new mongoose.Schema({
    matricul:{type:String,unique:false,undefined:false},
    nom:{type:String,unique:false,undefined:false},
    prenom:{type:String,unique:false,undefined:false},
    ecole:{type:String,unique:false,undefined:false},
    ressource:{type:String,unique:false,undefined:false},
    date:{type:Date,unique:false,undefined:false},
    duree:{type:String,unique:false,undefined:false},
    status:{type:String,unique:false,undefined:false},
}) ;
module.exports = mongoose.model("Demande",DemandeSchema);