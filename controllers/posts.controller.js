const Posts = require("../models/schema.model");

module.exports.create = (req, res) => {
    Posts.create(req.body)
    .then((post) => {
        res.json(post)
    } )
    .catch((err) => {
        res.status(400).json(err)
    })
};
module.exports.list = (req, res) => {
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
            res.json({message: "Post not found"})
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
            res.status(404).json({message:"Post not found"});
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

//IMPORTAR EL MODELO DE LA BASE DE DATOS
//OJO: EXPRESS NO SABE CODIFICAR JSON. USAR MIDDLEWARE en app.js
//-- aqui están los 5 controladores para las CRUD operations.