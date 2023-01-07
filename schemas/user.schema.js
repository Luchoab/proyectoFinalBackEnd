//Incorporamos biblioteca mongoose y guardamos schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Armamos el schema de usuario que queremos.
const UserSchema = new Schema({
    name: String,
    age: Number,
    email: String,
})

//Exportamos en schema y vinculamos el schema con la base de datos users. Lo ponemos con mayuscula y singular.
module.exports = mongoose.model('User', UserSchema);