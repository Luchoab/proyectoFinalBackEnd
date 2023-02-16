const express = require ('express');
const app = express();
const user_routes = require('./routes/user.routes');

const methodOverride = require ('method-override');
const session = require('express-session');

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
//metodo para autenticar el usuario
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,

}))
app.use(user_routes);


module.exports = app;

