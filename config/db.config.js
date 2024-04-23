//añadir las librerias agregando al package.json las dependencias: mongoose y mongodb-memory-server 
//dar npm i para agregar los modulos 



const mongoose = require("mongoose");

const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

//CONEXION Y CONFIG DE LA BASE DE DATOS. HE ELIMINADO TRES OPCIONES QUE YA SON OBSOLETAS. 
MongoMemoryServer.create()
    .then((mongoServer) => mongoose.connect(mongoServer.getUri(), {
        // usNewUrlParser: true,
        dbName: "activity-2",
        // useCreateIndex: true,
        // useUifiedTopology: true
    }))
    .then(() => console.info(`Successfully connected to the database`))
    .catch((error) => {
        console.error("An error occurred trying to connect to the database", error);
        process.exit(1);
    });

//CERRAR BIEN LAS CONEXIONES
process.on("SIGINT", () => {
    mongoose
    .disconnect()
    .then(() => {
        console.info("Successfully disconnected mongodb");
        process.exit(0);
    })
    .catch((error) => {
        console.error("An error occurred trying to disconnect mongoose", error);
        process.exit(1);
    });
});