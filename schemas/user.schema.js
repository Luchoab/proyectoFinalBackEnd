const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creamos schema de usuario
const UserSchema = new Schema({
name: {
    type:String,
    required: true,
    minlength:3,
    maxlength:8
},
lastName:{
    type:String,
    required: true,
    minlength:3,
    maxlength:10
},
email: {
    type: String,
    required:true,
    unique:true,
    index:true,
    minglength:8,
    maxlength:30
},
// <<<<<<< HEAD
password:{
    type:String,
    minlength:3,
    maxlength:10
},
age: {
    type: Number,
    required: true,
    min:15,
    max:120,
},
// =======
// age: {
//     type: Number,
//     required: true,
//     min:15,
//     max:120,
// },
// >>>>>>> ca553c5a5c69a7cef28f42ecf80b89989fa28db0

active: {
    type:Boolean,
    default:true,
    required:true
}

})


module.exports = mongoose.model('User', UserSchema);