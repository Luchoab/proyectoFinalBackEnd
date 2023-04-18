// Configurar servidor express para que siempre este escuchando.
const mongoose = require ('mongoose');
const app = require('./app');

require ('dotenv').config({path:'./.env'});

// Vinculamos la base de datos.

async function dbConnect() {

    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.DB_CONNECTION)
    console.log('conexion correcta con la db');

    app.listen(process.env.PORT,()=>{
        console.log(`Servidor express escuchando en el puerto ${process.env.PORT}`)
    })
}

dbConnect();



