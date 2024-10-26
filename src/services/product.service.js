// importamos el repository de product
import ProductRepository from "../repositories/product.repository.js";

import ProductDTO from "../dto/product.dto.js";
// Aqui trabajamos la logica.

class ProductServices {

    async addProduct(productData) {
        try {
            if (!productData.title || !productData.description || !productData.code || !productData.price || !productData.stock || !productData.category) {
                throw new Error("Es necesario completar todos los campos de información del producto.");
            }
    
            const productExist = await ProductRepository.getProductByCode({code: productData.code});
            if (productExist) throw new Error("El código debe ser único");
            console.log(productData);
            
            const productDTO = new ProductDTO(productData);
    
            return await ProductRepository.createProduct(productDTO);
        } catch (error) {
            console.error('Error al crear el producto:', error);
            throw new Error("No pudo crearse el producto");
        }
    }

    async getProducts(){
        try {
            const products = await ProductRepository.getProducts();
            if(!products){
                return "No hay productos cargados";
            }

            return products;
        } catch (error) {
            throw new Error("Error al intentar obtener los productos.");
        }
    }

    async getProduct(id){
        try {
            const product = await ProductRepository.getProductById(id);

            // Si no existe el producto, enviamos un aviso, caso contrario retornamos el producto buscado.
             return !product ? "No existe el producto buscado" : product;


        } catch (error) {
            console.error(error);
            throw new Error("Error al buscar el producto.");
        }

    }
    
    async updateProduct(id,productData) {
        try {
            const update = await ProductRepository(id, productData);

            if(!update){
                return null;
            }

            return update;
        } catch (error) {
            throw new Error("No es posible actualizar el producto.");
        }
    }

    async deleteProduct(id){
        try {
            await ProductRepository.deleteProductById(id);

            return "Producto eliminado"
        } catch (error) {
            throw new Error("Error al intentar borrar el producto.")
        }
    }

    async paginateProducts(filter,options){
        try {
            const productsPaginated = await ProductRepository.productsPaginate(filter,options);

            if(!productsPaginated){
                return "No es posible paginar los productos";
            } else {
                return productsPaginated;
            }


        } catch (error) {
            throw new Error("Error al paginar los productos.");
        }
    }


}

export default new ProductServices();