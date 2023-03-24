const express = require('express');;
const api = express.Router();

const usersControllers = require('../controllers/user.controller')
// Llamamos al edpoint con un metodo (get,post,delete,etc) y funciones que queremos ejectuar.
api.get('/', (req, res)=>{
    res.json('Hola desde el home')
})

//GET para leer usuarios
api.get('/users', usersControllers.getUsers)

//POST para cargar usuarios
api.post('/users', usersControllers.addUsers)
//PUT para actualizar usuarios
api.put('/users/:id', usersControllers.updateUser)
//DELETE para eliminar usuarios
api.delete('/users/:id', usersControllers.delUser)
//Login 
api.post('/login', usersControllers.login)
module.exports = api;