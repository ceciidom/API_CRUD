//1. GENERAR LAS RUTAS Y EXPORTAR PARA USAR EN APP.JS

const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts.controller");
const users = require("../controllers/users.controller");
const {checkAuth} = require ("../middlewares/auth.middlewares");



router.post("/api/posts", posts.create );
router.get("/api/posts/detail/:id", checkAuth, posts.detail); 
router.get("/api/posts", checkAuth, posts.list);
router.patch("/api/posts/:id", checkAuth, posts.update);
router.delete("/api/posts/:id", checkAuth, posts.delete);
router.post("/api/users", users.createUser);
router.post("/api/login", users.login);
router.get("/api/activate/:userId", users.activateUser)

//ACT 4. 
// -- Actualiza creacion de usuario para establecer "active" como "false"
// -- Crear nueva ruta GET para que el usuario active su cuenta 
// -- Logica de esta ruta: cuando el usuario acceda con su ID, cambiar "active" a "true"    


module.exports = router;