//Configurar servidor express para que siempre este escuchando.
const mongoose  = require('mongoose');
const port = 3001;
const app = require('./server');

//Vinculasmos la base de datos.
const password = 'SWh5DubdRvNI6nUh'
const URL = `mongodb+srv://proyectoFinal:${password}@proyectofinlabackend.ipvbroy.mongodb.net/test`;


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


