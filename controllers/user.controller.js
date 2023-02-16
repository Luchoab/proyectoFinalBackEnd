//Aqui se escribiran las funciones para los usuarios.
const User = require('../schemas/user.schema.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//llamo a la libreria del token//
const jwt = require('jsonwebtoken');
//creo la semilla para codificar el token-es para login
const secret = '4lf4_b3t4!'


//Funcion para leer los usuarios.

async function getUsers(req,res){
    const userDB = await User.find();
    console.log(userDB)
    res.json(userDB)
}

async function addUsers(req,res){
try {
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    const errorP = [];
    if(password != confirmPassword){
        errorP.push({Text: 'Las contraseñas no coinciden'})
    }

    const userToSave = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword : req.body.confirmPassword,
        // age: req.body.age,
        active: req.body.active || true
    })

    bcrypt.hash(password, saltRounds, function(error,hash){
        if(error) return res.send(`Hubo un error interno`)
        userToSave.password = hash
    } )




    const userSaved = await userToSave.save()
        res.json('El usuario ha sido creado correctamente')

    if(!userSaved){
        res.json('El usuario no se guardo correctamente')
    }

} catch (error) {
    console.log(error);

    res.status(400).json({
        msg:'Error al crear usuario',
        ok:false
    })
}
}

module.exports = {
    getUsers,
    addUsers
}