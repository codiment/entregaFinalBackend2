import {Router} from "express";
import CartController from "../controllers/cart.controller.js";
import passport from "passport";
const cartRouter = Router();
const controller = new CartController();



// Metodo POST para crear un carrito.
cartRouter.post("/", controller.newCart);
// Metodo GET para mostrar el carrito creado con o sin productos.
cartRouter.get('/:cid', controller.getCart);
// Metodo POST para agregar un producto al carrito (ambos con su id generados por mongodb).
cartRouter.post("/:cid/products/:pid", controller.addProductToCart);
// Metodo PUT para actualizar productos.
cartRouter.put("/:cid", controller.updateCart);
// Metodo PUT para actualizar la cantidad del mismo producto.
cartRouter.put("/:cid/products/:pid", controller.updateQuantity)
// Metodo DELETE para eliminar un producto del carrito.
cartRouter.delete("/:cid/products/:pid", controller.deleteProductInCart);
// Metodo DELETE para eliminar todos los productos.
cartRouter.delete("/:cid", controller.cartClean)

// Metodo para finalizar la compra.
cartRouter.post("/:cid/purchase",passport.authenticate("current", { session: false }) ,(req, res, next) => {
    console.log("Usuario autenticado:", req.user); // Debería mostrar el usuario si está autenticado
    next(); // Continúa al siguiente middleware
},  controller.purchaseCart);

export default cartRouter;