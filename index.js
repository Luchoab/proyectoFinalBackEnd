// Configurar servidor express para que siempre este escuchando.
const mongoose = require ('mongoose');
const app = require('./app');
const port = 3001;



// Vinculamos la base de datos.
const password = '36439779'
const URL = `mongodb+srv://salamino:${password}@clustersam.d8zvhgz.mongodb.net/ProyectoFinal-RC`;

async function dbConnect() {

    mongoose.set('strictQuery', false);
    await mongoose.connect(URL)
    console.log('conexion correcta');

    app.listen(port,()=>{
        console.log(`Servidor express escuchando en el puerto ${port}`)
    })
}

dbConnect();



