// Importamos el ProductModel
import ProductModel from "./models/product.model.js"

//Creamos un DAO para products

class ProductDAO {
    async findById(id){
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            console.error("Error al buscar el producto:", error);
            throw new Error("Error al buscar el producto.");
        }
    }

    async findOne(query){
        return await ProductModel.findOne(query);
    }

    async find(){
        return await ProductModel.find();
    }

    async save(productData){
        const product= new ProductModel(productData);
        return await product.save();
    }

    async update(id,productData){
        return await ProductModel.findByIdAndUpdate(id,productData);

    }

    async delete(id){
        return await ProductModel.findByIdAndDelete(id);
    }

    //Funcion que va a aplicar el paginate.
    async paginate(filter,options) {
        return await ProductModel.paginate(filter, options);
    }

}

export default new ProductDAO();