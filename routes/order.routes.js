const express = require('express');
const api = express.Router();

const orderController = require('../controllers/order.controller');

api.get('/orders', orderController.getOrders);

api.post('/orders', orderController.addOrders);

api.delete('/orders/:id', orderController.delOrder);

api.put('/orders/:id', orderController.updateOrder);


module.exports = api;