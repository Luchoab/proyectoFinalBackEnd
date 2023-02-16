const jwt = require('jsonwebtoken');
const secret = '4lfa_b3t4!';


//tiene un 3 parametro, esta f recibe el token
function jwtVerify(req, res, next) {
    const token = req.headers.authorization;


    //aqui verifico si el token existe
    if(!token) {
        return res.status(400).send({
            msg: `Token inexistente`,
            ok: false
        })
    }


    //aqui verifico si el token que recibo es correcto: recibe un token, luego la palbra secreta, y tiene una f de callback: puede tener un error o un payload
    jwt.verify(token, secret, (error, payload) => {
        if(error) {
            console.log(error)
            return res.status(401).send({
                msg:"Token inválido",
                ok: false
            })
        }

        console.log(`Payload`)
        console.log(payload);

        //devuelvo la data del usuario logueado
        req.user = payload

        next();
    })


    
}

module.exports = jwtVerify;