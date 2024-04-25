//1. GENERAR LAS RUTAS Y EXPORTAR PARA USAR EN APP.JS

const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts.controller");
const users = require("../controllers/users.controller");
const {checkAuth} = require ("../middlewares/auth.middlewares");



router.post("/api/posts", posts.create );
router.get("/api/posts/detail/:id", posts.detail); 
router.get("/api/posts", checkAuth, posts.list);
router.patch("/api/posts/:id", posts.update);
router.delete("/api/posts/:id", posts.delete);
router.post("/api/users", users.createUser);
router.post("/api/login", users.login)


module.exports = router;