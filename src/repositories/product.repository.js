// Importamos el ProductDAO
import ProductDAO from "../dao/product.dao.js";
import mongoose from "mongoose";
class ProductRepository {
    async createProduct(productData){
        return await ProductDAO.save(productData);
    }

    async getProducts(){
        return await ProductDAO.find();
    }

    async getProductByCode(code){
        return await ProductDAO.findOne(code);
    }

    async getProductById(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(`El ID proporcionado no es válido: ${id}`);
        }
        return await ProductDAO.findById(id);
    }


    async updateProductById(id, productData){
        return await ProductDAO.update(id, productData);
    }

    async deleteProductById(id){
        return await ProductDAO.delete(id);
    }

    async productsPaginate(filter,options){
        return await ProductDAO.paginate(filter,options);
    }
}

// exportamos la instancia.
export default new ProductRepository();