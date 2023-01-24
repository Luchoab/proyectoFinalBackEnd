const express = require ('express');
const app = express();
const user_routes = require('./routes/user.routes');
const product_routes = require('./routes/product.routes');

const cors = require('cors');

app.get('/',(req, res)=>{
    res.send('hello');
});

// app.get('/users', async(req, res)=>{
//      const usersFromDB = await User.find();
//      console.log(usersFromDB);
//     res.send(usersFromDB)
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(user_routes, product_routes);


module.exports = app;

