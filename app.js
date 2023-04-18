const express = require ('express');
const app = express();
const user_routes = require('./routes/user.routes');
const product_routes = require('./routes/product.routes');
const order_routes = require('./routes/order.routes');


const cors = require('cors');

app.get('/',(req, res)=>{
    res.send('server working');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(user_routes, product_routes, order_routes);


module.exports = app;

