const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required:true, minlength:3, maxlength: 24},
    url: {type: String, required: true},
    description: {type: String, required: true, minlength: 30},
    info: {type: String, required: true, minlength: 30},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Producto', productSchema);