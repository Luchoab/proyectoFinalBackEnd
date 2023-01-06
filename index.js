//Instalar express js para que escuche constantemente el servidor
const { json } = require('express');
const express = require('express');
const app = express();
const port = 3001;
const axios = require('axios').default

app.get('/', (req,res) => {

});

app.listen(port, ()=>{
    try {
        console.log(`Escuchando desde el puerto ${port}`);
    } catch (error) {
        console.log('Error al levantar el servidor');
    }
    
});