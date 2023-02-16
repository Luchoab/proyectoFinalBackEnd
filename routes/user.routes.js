const express = require('express');;
const api = express.Router();
const jwtVerify = require('../middlewares/isAuth')


const usersControllers = require('../controllers/user.controller')
// Llamamos al edpoint con un metodo (get,post,delete,etc) y funciones que queremos ejectuar.
api.get('/', (req,res)=>{
    res.json('Hola desde el home')
});

api.get('/users', (req,res)=>{
    res.json('Formulario de registro usuario')
})

//GET para leer usuarios
api.get('/users',jwtVerify, usersControllers.getUsers)

//POST para cargar usuarios
api.post('/users', usersControllers.addUsers)
//PUT para actualizar usuarios
api.put('users')
//DELETE para eliminar usuarios
api.delete('/users')

module.exports = api; 