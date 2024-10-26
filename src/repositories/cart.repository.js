// importamos el DAO de cart
import CartDAO from "../dao/cart.dao.js";

import mongoose from 'mongoose';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
// Creamos el repository de cart

class CartRepository {
    async createCart(){
        return await CartDAO.save();
    }


    async getCartById(cid) {
        try {
            if (!isValidObjectId(cid)) {
                throw new Error(`El id ${cid} no es un ObjectId válido`);
            }
            const cart = await CartDAO.findById(cid);
            if (!cart) {
                throw new Error(`No se encontró el carrito con id ${cid}`);
            }
            return cart;
        } catch (error) {
            console.error(`Error en CartRepository.getCartById: ${error.message}`);
            throw error;
        }
    }

    async addProductToCart(cid,cartData){
        return await CartDAO.update(cid,cartData);
    }

    // Actualizamos info del carrito.
    async updateCart(cid,cartData){
        return await CartDAO.update(cid,cartData);
    }

    //que pueda solo modificar la cantidad

    async deleteCartByid(cid){
        return await CartDAO.delete(cid);
    }

    //que pueda borrar el producto del carrito.

    async productDelete(cartData){
        const cid = cartData[0];
        const update = cartData[1];
        return await CartDAO.updateOne(cid, update);
    }
}

export default new CartRepository();