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

async function login(req,res){
try {
    //Captar datos 
    const email = req.body.email;
    const password = req.body.password
    //Buscar si existen los datos en la base de datos
    const user = await User.findOne({email:email});
    //Comparar usuarios
    if (!user){
        return res.json({
            msg:'No se encontro el usuario',
            ok:false
        })
    }   
    const passwordUser = await User.find({password:password})

    if(passwordUser){
        return res.status(200).json({
            msg:'Login correcto',
            ok:true
        })
    }else{
        return res.status(404).json({
            msg:'La contraseña es incorrecta',
            ok:false
        })
    }


} catch (error) {
    res.status(400).json({
        msg:'Error al logearse',
        ok:false
    })
}
}

async function updateUser(req,res){
    try {
        const id = req.params.idParam

        const user = await User.findById(id);
        if(!user){
            return formatMsg(res,404,`No se encontro el usuario`,false)
        }
        const update = req.body
        const userUpdate = await User.findByIdAndUpdate(id,update,{new:true}).select({password:0})

        console.log(userUpdate);

        formatMsg(res,200,`Actualizar usuario ${id}`,true)


    } catch (error) {
        formatMsg(res,400,`Error al actualizar el usuario con el id ${id}`, false)
    }
}





function formatMsg(res,code,msg,ok){
    return res.status(code).json({msg,ok})
}

module.exports = {
    getUsers,
    addUsers,
    login,
    updateUser
}