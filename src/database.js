import mongoose from "mongoose";

mongoose.connect("mongodb+srv://codiment:coderhouse@cluster0.upyu7.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la base de datos"))
    .catch((error) => console.log("Error al conectarse a la base de datos", error))