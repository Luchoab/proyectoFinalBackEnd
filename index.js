//Configurar servidor express para que siempre este escuchando.
const express = require('express');
const mongoose  = require('mongoose');
const app = express();
const port = 3001;

//Vinculasmos la base de datos.
const password = 'SWh5DubdRvNI6nUh'
const URL = `mongodb+srv://proyectoFinal:${password}@proyectofinlabackend.ipvbroy.mongodb.net/test`;

//Llamamos al schema de usuarios
const User = require('./schemas/user.schema')



//Nos conectamos a la base de dato con mongoose y funcion async.
async function main(){
    console.log('\x1b[34m Conectando a la base de datos...\x1b[37m');
    mongoose.set('strictQuery', false)
    await mongoose.connect(URL)
    console.log('\x1b[95m Se ha conectado correctamente a la base de datos \x1b[37m');

    app.listen(port, ()=>{
        try {
            console.log(`\x1b[32m Escuchando desde el puerto ${port} \x1b[37m`);
        } catch (error) {
            console.log('\x1b[31 Error al levantar el servidor \x1b[34');
        }
    });
}

main().catch(error => console.error('\x1b[31m Error al conectar a la base de datos \x1b[37m',error));


// Llamamos al edpoint con un metodo (get,post,delete,etc) y funciones que queremos ejectuar.
app.get('/', (req,res)=>{
    res.send('Hola desde el home')
})

