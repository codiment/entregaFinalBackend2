import { Router } from "express";
const viewsRouter = Router();
import { soloAdmin, soloUser } from "../middleware/auth.js";
import passport from "passport";
import cartService from "../services/cart.service.js";
import TicketService from "../services/ticket.service.js";

import productService from "../services/product.service.js";

// Usamos paginate.
viewsRouter.get("/products", passport.authenticate("current", {session: false}), soloUser , async (req,res) => {
    try {

        const cid = req.user.cart;
        // Cada producto sera ordenado de menor precio a mayor.
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || 'price';
        const order = req.query.order === 'desc' ? -1 : 1;
        const category = req.query.category || '';

        const filter = {};

        if(category) {
            filter.category = category;
        }
       
        const options = {
            limit,
            page,
            sort: { [sort]: order },
            lean: true
        };

        const products = await productService.paginateProducts(filter, options);

        if (!products.docs || products.docs.length === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'No se encontraron productos en esta página'
            });
        }

        const payload = {
            payload: products.docs,
            cartId: cid,
            status: "success",
            pagination: {
                totalDocs: products.totalDocs,
                limit: products.limit,
                totalPages: products.totalPages,
                page: products.page,
                pagingCounter: products.pagingCounter,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage
            },
            query: {
                sort,
                category,
                limit
            }
        }
        res.status(200).render("home", {
            products: payload.payload,
            pagination: payload.pagination,
            query: payload.query,
            cid: cid
        });

    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).send("Hay un error del servidor, no podemos mostrar los productos");
    }
});


// Renderizamos la lista de productos.
viewsRouter.get("/realtimeproducts", passport.authenticate("current", {session: false}), soloAdmin , (req,res) => {
    try {
        return res.render("realTimeProducts");

    } catch (error) {
        res.status(500).send("Hay un error en el servidor, intente mas tarde");
    }
});


// Renderizamos la lista de carrito.
viewsRouter.get("/carts/:cid", async (req, res) => {
    const { cid } = req.params;
    console.log(`ID recibido: ${cid}`);
    try {
        const cart = await cartService.getCartById(cid);
        
        if (!cart) {
            res.send(`No hay un carrito con el id ${cid}`);
            return;
        }
        const productInCart = cart.products.map(product => ({
            productId: product.product._id,
            quantity: product.quantity,
            title: product.product.title,
            price: product.product.price,
            category: product.product.category,
            thumbnails: product.product.thumbnails
        }));
        console.log("Contenido del carrito:", productInCart);

        res.render("cartView", { cart: productInCart, cid: cid });

    } catch (error) {
        res.status(500).send("Hay un error , no es posible mostrar el carrito.");
        throw error;

    }
});

viewsRouter.get("/ticket/:code", async (req, res) => {
    const { code } = req.params;

    try {
        // Busca el ticket usando el código
        const ticket = await TicketService.findTicketByCode(code);

        if (!ticket) {
            return res.status(404).send("Ticket no encontrado.");
        }

        // Convertir el ticket a un objeto plano
        const plainTicket = JSON.parse(JSON.stringify(ticket));

        // Renderiza la vista del ticket con el objeto plano
        return res.render("ticketView", { ticket: { purchaseTicket: plainTicket } });
    } catch (error) {
        console.error("Error al obtener el ticket:", error);
        return res.status(500).send("Error al mostrar el ticket.");
    }
});




// Renderizamos login
viewsRouter.get("/login", (req, res) => {
    res.render("login");
});

// Renderizamos registro
viewsRouter.get("/register", (req, res) => {
    res.render("register");
});








export default viewsRouter;