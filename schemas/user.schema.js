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
password:{
    type: String,
    required: true
},
role:{
    type: String,
    default: "user"
},
active: {
    type:Boolean,
    default:true,
    required:true
}

})


module.exports = mongoose.model('User', UserSchema);