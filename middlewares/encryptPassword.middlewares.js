const bcrypt = require("bcryptjs");

// Middleware function to encrypt password before creating a user
const encryptPassword = (req, res, next) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al generar la sal", error: err });
    }
    bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al cifrar la contraseña", error: err });
      }
      req.body.password = hashedPassword;
      next();
    });
  });
};

const comparePasswords = (req, res, next) => {
  const { password, hashedPassword } = req.body;
  bcrypt.compare(password, hashedPassword, (err, isMatch) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al comparar contraseñas", error: err });
    }
    if (isMatch) {
      // Passwords match
      next();
    } else {
      // Passwords don't match
      res.status(401).json({ message: "Contraseña incorrecta" });
    }
  });
};


module.exports = { encryptPassword, comparePasswords };
