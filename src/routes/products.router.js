// Router de products

import {Router} from "express";
const productRouter = Router();
import ProductController from "../controllers/product.controller.js";
const controller = new ProductController();




// Metodo GET para mostrar los productos.
productRouter.get('/', controller.getProducts)
// Metodo GET para buscar los productos por id.
productRouter.get("/:pid", controller.getProduct);
// Metodo POST para agregar un producto.
productRouter.post("/", controller.newProduct);
// Metodo PUT para actualizar la informacion de un producto.
productRouter.put("/:pid", controller.productUpdate);
// Metodo DELETE para eliminar un producto.
productRouter.delete("/:pid", controller.productDelete)

export default productRouter;