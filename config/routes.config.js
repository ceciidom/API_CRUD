//1. GENERAR LAS RUTAS Y EXPORTAR PARA USAR EN APP.JS

const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts.controller");
//ACT 3 IMPORT USERS CONTROLLER
const users = require ("../controllers/users.controller")
//ACT 3 IMPORT CHECK AUTH
const {checkAuth} = require ("../middlewares/auth.middlewares")

//2. IMPORTAR EL CONTROLADOR A LA RUTA:
//CRUD OPERATIONS:

//1. POST /api/posts
router.post("/api/posts", posts.create );
// 3. GET /api/post/<id>
router.get("/api/posts/detail/:id", posts.detail);
// 2. GET /api/posts 
router.get("/api/posts", checkAuth, posts.list);
// 4. PATCH /api/posts/<id>
router.patch("/api/posts/:id", posts.update);
// 5. DELETE /api/posts/<id>
router.delete("/api/posts/:id", posts.delete);

//ACT 3. 1. POST api/users 
router.post("/api/users", users.users);
//act 3. 2. POST api/login
router.post("/api/login", users.login)


module.exports = router;