//Aqui se escribiran las funciones para los usuarios.
const User = require('../schemas/user.schema.js');

//Funcion para leer los usuarios.

async function getUsers(req,res){
    const userDB = await User.find();
    console.log(userDB)
    res.json(userDB)
}

async function addUsers(req,res){
try {
    const userToSave = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        active: req.body.active || true
    })

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