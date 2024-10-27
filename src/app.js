import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import passport from "passport";
import ProductServices from "./services/product.service.js";
import initializePassport from "./config/passport.config.js";

import { Command } from "commander";
import configInstance from "./config/config.js";

const program = new Command();
program.option("-e, --env <environment>", "Entorno de la aplicación", "development");
program.parse(process.argv);

const option = program.opts();
process.env.NODE_ENV = option.env;



const app = express();
const PUERTO = configInstance.get("PORT");




// Routes
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize());

initializePassport();

// Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions/", sessionRouter);
app.use("/", viewsRouter);

// Utilizaremos handlebars y lo configuramos
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Renderizamos la pagina de inicio
app.get("/", (req, res) => {
    res.send("Home");
});

const httpServer = app.listen(PUERTO, () => {
    console.log(`servidor conectado al puerto: http://localhost:${PUERTO}`);
});

// Usamos socket io con la importacion de productRepository
const io = new Server(httpServer);

io.on('connection', async (socket) => {
    // enviamos los productos al cliente.
    socket.emit("products", await ProductServices.getProducts());

    // Eliminamos el producto.
    socket.on("productDelete", async (id) => {
        await ProductServices.deleteProduct(id);

        // volvemos a enviar la lista actualizada.
        socket.emit("products", await ProductServices.getProducts());
    });

    // recibimos el nuevo producto:
    socket.on("newProduct", async (data) => {
        await ProductServices.addProduct(data);

        // volvemos a enviar la lista actualizada.
        const updatedProducts = await ProductServices.getProducts();
        io.emit('updateProducts', updatedProducts);
    });
});