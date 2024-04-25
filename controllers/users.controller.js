const User = require("../models/schema.user");
const { v4: uuidv4 } = require("uuid");
const { sessions } = require("../middlewares/auth.middlewares");
const bcrypt = require("bcryptjs");
const { encryptPassword, comparePasswords } = require("../middlewares/encryptPassword.middlewares");

module.exports.users = (req, res) => {
    // Crear el usuario en la base de datos
    User.create(req.body)
        .then((user) => {
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
      // Invoke the comparePasswords middleware to compare passwords
      req.body.hashedPassword = user.password;
      comparePasswords(req, res, () => {
        // If passwords match, generate a token and store it in memory
        const token = uuidv4();
        sessions.push({ userId: user.id, token });
        res.json({ message: "Inicio de sesión exitoso", user, token });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error al buscar usuario", error: err });
    });
};
