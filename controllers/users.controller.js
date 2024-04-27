const User = require("../models/schema.user");
const { v4: uuidv4 } = require("uuid");
const { sessions } = require("../middlewares/auth.middlewares");
const bcrypt = require("bcryptjs");
const { encryptPassword, comparePasswords } = require("../middlewares/encryptPassword.middlewares");

module.exports.users = (req, res) => {
    // Crear el usuario en la base de datos
    User.create(req.body)
        .then((user) => {

          //use middlware to send activation mail
          console.log(
            `URL de activación: http://localhost:8000/api/activate/${user.id}`
          );
            res.json(user);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};

module.exports.createUser = [encryptPassword, this.users];

module.exports.login = (req, res) => {
  // Buscar el usuario por su correo electrónico
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      // verificar que la cuenta está activa
      if(!user.active) {
        return res.status(401).json({message: "Cuenta inactiva. Por favor, activa tu cuenta para iniciar sesión"})
      }
      req.body.hashedPassword = user.password;
      comparePasswords(req, res, () => {
        const token = uuidv4();
        sessions.push({ userId: user.id, token });
        res.json({ message: "Inicio de sesión exitoso", user, token });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error al buscar usuario", error: err });
    });
};

//create rouute to acivate user
module.exports.activateUser = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId).then(user => {
    if(!user.active){
          user.active = true
    user.save();
    res.json({message: "usuario activado exitosamente"})
    } else {
      res.json({ message: "El usuario ya estaba activo" });
    }

  })
  .catch((err) => {
    res.status(404).json({ message: "usuario no encontrado" , error: err });
  })
}