const sessions = [];
module.exports.sessions = sessions

module.exports.checkAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split("Bearer ")[1];
  const session = sessions.find((x) => x.token === token);
  
  if (!session) {
    res.status(401).json({ message: "unauthorized" });
  };
  
  next();
}
// Crear y exportar const sessions para almacenar los tokens. Sessions se debe importar en el controlador de USERS donde se usa. 
//ACT 3. AUTENTICAR USUARIO
// -- Guadar el token de la cabecera de la petición.
// -- Comparar el token recibido con la base de datos en mi cache
// -- Que hacer si el token NO coincide con alguno en la base.
// -- NEXT() : continuar con la siguiente instrucción
