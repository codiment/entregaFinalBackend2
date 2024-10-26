// Importamos el CartModel
import CartModel from "./models/cart.model.js";
import mongoose from "mongoose";


//Crear class del DAO de cart.
//Se va a encargar de la conexion con MongoDB.
class CartDAO {
    async findById(id) {
        try {
            if (!mongoose.isValidObjectId(id)) {
                throw new Error(`ID inválido: ${id}`);
            }
            return await CartModel.findById(id).populate('products.product');
        } catch (error) {
            throw new Error("Error al encontrar el carrito: " + error.message);
        }
    }

    async findOne(query){
        return await CartModel.findOne(query);
    }

    async save(){
        const cart = new CartModel({products: []});
        return await cart.save();
    }

    async update(id,cartData){
        return await CartModel.findByIdAndUpdate(id,cartData);
    }

    async  delete(id){
        return await CartModel.findByIdAndDelete(id);
    }

    async updateOne(cid, update) {
        return await CartModel.updateOne({ _id: cid }, update);
    }
    
}

export default new CartDAO();