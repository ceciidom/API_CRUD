const User = require("../models/schema.user");
const { v4: uuidv4 } = require("uuid");
const {sessions} = require("../middlewares/auth.middlewares")


module.exports.users = (req, res) => {
  User.create(req.body)
  .then((user) => {
    res.json(user)
  })
  .catch((err) => {
    res.status(400).json(err)
  })
  //No necesita ser autenticada
  //Almacena el usuario en Base de Datos en memoria cifrando su contraseña (el cifrado de la contraseña es opcional)
};

//general un array para guardar los tokens y a que usuario pertenecen.

module.exports.login = (req, res) => {

    console.log("calling from users. controller LOGIN")
// - Recibe body con email, password
// - Devuelve HTTP 200 OK con token JWT de sesión si las credenciales son correctas
// - Devuelve HTTP 400 en caso de error en la validación de datos
// - Devuelve HTTP 401 si las credenciales no son correctas
    User.findOne({ email: req.body.email, password: req.body.password })
    .then((user) => {
        if(user) {
            //si si existe el usuario crear token 
            const token = uuidv4();

            //guardar en memoria el user id y su token
            sessions.push({userId: user.id, token})
            console.log(sessions)
            res.json({token})

        } else {
            res.status(401).json({message: "invalid credentials"})
        }
    })

}
module.exports.sessions = sessions;

//ahora, en posts.controller autenticar usuario antes de mostrar los posts. 
//importar
// -- el modelo de los usuarios
// -- el módulo uuid para crear tokens unicos 
// -- importar el array sessions de mi middleware the auenticación 