//Aqui se escribiran las funciones para los usuarios.

require ('dotenv').config({path:'./.env'});
const User = require('../schemas/user.schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
const saltRounds = process.env.SALT;

//Funcion para leer los usuarios.

async function getUsers(req,res){
    const page = req.query.page;
    const limit = process.env.PAGE_LIMIT;
    const dbUsers = await User.find({}, { password: 0 }).limit(limit).skip(page * limit);
    const totalUsers = await User.countDocuments();
    res.send({total: totalUsers,
        users: dbUsers});
}

async function addUsers(req,res){
    let password = req.body.password;
    try{
        const userToSave = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            active: req.body.active || true
        })
        userToSave.email = userToSave.email?.toLowerCase();
        const checkEmail = await User.findOne({ email: userToSave.email });
        if(checkEmail) return res.status(400).send("Email en uso");
        const hash = await bcrypt.hash(password, saltRounds);
        userToSave.password = hash;
        const userSaved = await userToSave.save(); 
        userSaved.password = undefined;
        return res.send({            
            msg: 'Creacion exitosa',
            ok: true,
            user: userSaved
        });
    } catch(error) {
        res.send({ 
            msg: 'No se pudo guardar el usuario',
            ok: false
    });
    }
}

async function delUser (req, res) {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) return res.status(404).send(`El id ${id} no se ha encontrado`);
        return res.status(200).send('Usuario borrado');
    } catch (error) {
        res.status(400).send('Error al borrar usuario');
    }
}

async function login(req,res){
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email});
        const result = await bcrypt.compare(password, user.password);
        if (!user) return res.status(404).send({
            msg: "Usuario no encontrado",
            ok: false
        })
        if(!result) {
            return res.status(404).send({
                msg: 'Login incorrecto', 
                ok: false
            })
        }
        
        const token = await jwt.sign(user.toJSON(), secret, { expiresIn: '2h' });
        if(user) return res.status(200).send({
            msg: 'Login exitoso',
            ok: true,
            token,
            user
        })
    } catch (error) {
        res.status(400).send({
            msg: "Error al loguearse",
            ok: false
        })
    }
}

async function updateUser(req,res){
    try {
        const id = req.params.id

        const user = await User.findById(id);
        if(!user){
            return formatMsg(res,404,`No se encontro el usuario`,false)
        }
        const update = req.body
        await User.findByIdAndUpdate(id,update,{new:true}).select({password:0})


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
    delUser,
    login,
    updateUser
}