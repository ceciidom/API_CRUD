//1. GENERAR LAS RUTAS Y EXPORTAR PARA USAR EN APP.JS

const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller")

//2. IMPORTAR EL CONTROLADOR A LA RUTA:
//CRUD OPERATIONS:

//1. POST /api/posts
router.post("/api/posts", users.create );
// 3. GET /api/post/<id>
router.get("/api/posts/detail/:id", users.detail);
// 2. GET /api/posts 
router.get("/api/posts", users.list);
// 4. PATCH /api/posts/<id>
router.patch("/api/posts/:id", users.update);
// 5. DELETE /api/posts/<id>
router.delete("/api/posts/:id", users.delete);


module.exports = router;