const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    product: {type: Object, required: true},
    user: {type: String, required:true, unique: true},
    state: {type: String, required: true, default: "pendiente"}
})

module.exports = mongoose.model('Order', orderSchema);