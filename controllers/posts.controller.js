//IMPORTAR EL MODELO DE LA BASE DE DATOS
//OJO: EXPRESS NO SABE CODIFICAR JSON. USAR MIDDLEWARE
const Posts = require("../models/schema.model");

const {sessions} = require("../controllers/users.controller");


module.exports.create = (req, res) => {
    console.log("create route executed");
    console.log(req.body)
    Posts.create(req.body)
    .then((post) => {
        res.json(post)
    } )
    .catch((err) => {
        res.status(400).json(err)
    })
};
module.exports.list = (req, res) => {
    console.log("list route executed");
    //ACT 3. AUTENTICAR USUARIO
    // -- aqui guardo el token de la cabecera de la petición. 
    const authHeader = req.header("Authorization");
    const token = authHeader.split("Bearer ")[1];

    // -- aqui comparo el token recibido con la base de datos en mi cache
    const session = sessions.find((x) => x.token === token);

    // -- aquí doy las instrucciones de que hacer si el token NO coincide con alguno en la base.
    if (!session) {
      res.status(401).json({ message: "unauthorized" });
    } 
    Posts.find()
    .then((allUsers) => {
        res.json(allUsers);
        })
        .catch((err) => {
            console.error(err);
        });};
    
    

module.exports.detail = (req, res) => {
    Posts.findById(req.params.id)
    .then((post) => {
        if (post === null) {
            res.json({message: "user not found"})
        } else {
            res.json(post)
        }
        
    }).catch(err => {
        console.error(err)
    })

};
module.exports.update = (req, res) => {
    Posts.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    .then ((user) => {
        if(user) {
            res.json(user);
        } else {
            res.status(404).json({message:"user not found"});
        }
    })
    .catch(console.error)
};
module.exports.delete = (req, res) => {
    Posts.findByIdAndDelete(req.params.id)
    .then((deletedPost) => {
        if (deletedPost){
                    res
                      .status(200)
                      .json({ message: "Post deleted successfully." });

        } else {
            res.status(404).json({message: "Post not found."})
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({message: "internal server error."})
    })
};