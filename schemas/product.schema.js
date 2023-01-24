const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    url: {type: String, required: true},
    name: {type: String, required:true, minlength:3, maxlength: 24},
    description: {type: String, required: true, minlength: 30},
    info: {type: String, required: true, minlength: 30},
    ordered: {type: Boolean, default: false, required: true}
});

module.exports = mongoose.model('Producto', productSchema);