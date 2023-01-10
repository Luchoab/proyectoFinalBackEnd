const express = require('express')
const api = express.Router();

// Llamamos al edpoint con un metodo (get,post,delete,etc) y funciones que queremos ejectuar.
api.get('/', (req,res)=>{
    res.json('Hola desde el home')
})

//GET para leer usuarios
api.get('/users', (req,res) =>{
    res.json('GET usuarios')
})
//POST para cargar usuarios
api.post('/users', (req,res) => {
    res.json('POST usuarios')
})
//PUT para actualizar usuarios
api.put('users', (req,res) => {
    res.json('PUT usuarios')
});
//DELETE para eliminar usuarios
api.delete('/users', (req,res) => {
    res.json('DELETE usuarios')
} )
