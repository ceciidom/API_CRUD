//COMO MODULARIZR APPS EN EXPRESS PARA QUE NO SEA UN ARCHIVO GIGANTE
//BASE DE DATOS, RUTAS, CONFIGURACIONES, MODELOS

//EL MAESTRO DE CEREMONIAS QUE ORGANIZA LOS IMPORTS DE OTROS FICHEROS.
//1) GENERAR SERVIDOR EXPRESS
//2) ARRANCARLO
//3) GENERAR RUTAS NECESARIAS
// 4) OJO: EXPRESS NO SABE DECODIFICAR JSON. USAR EL MIDDLEWARE ANTES DE LAS RUTAS


const express = require("express");
const app = express();

const port = 8000;
require("./config/db.config")

//middleware para json
app.use(express.json());

//rutas:
const router = require("./config/routes.config");
app.use(router)



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

