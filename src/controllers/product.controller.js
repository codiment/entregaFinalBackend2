// Importamos el ProductServices
import ProductServices from "../services/product.service.js"

// creamos la class ProductController

class ProductController {
    //Obtener productos con filtros y paginacion.
    async getProducts(req,res) {
        try {
            // Query params
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || 'price';
        const order = req.query.order === 'desc' ? -1 : 1;
        const category = req.query.category || '';

            // Filtro por categoría si se pasa en los query params
        const filter = {};
        if (category) {
            filter.category = category;
        }

        // Configuración de opciones para el método paginate
        const options = {
            limit,
            page,
            sort: { [sort]: order }, // Ordenamos por el campo y dirección especificados
            lean: true
        };

        const products = await ProductServices.paginateProducts(filter,options);

        // console.log(products);

        // Si no hay productos en la página actual
        if (products.docs.length === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'No se encontraron productos en esta página'
            });
        }

       // respuesta con los datos con paginate.
        res.status(200).send({
            status: 'success',
            products: products.docs,
            pagination: {
                totalDocs: products.totalDocs,
                limit: products.limit,
                totalPages: products.totalPages,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage
            }
        });
        
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'Error del servidor al obtener los productos'
            });
            
        }
    }

    async getProduct(req, res) {
    // Obtenemos el id del producto por params
    const { pid } = req.params;

    try {
        const productFound = await ProductServices.getProduct(pid);

        // Cambia esto para evaluar si productFound es una cadena de error
        if (typeof productFound === "string") {
            res.status(404).send(`No hay productos con el id ${pid}`);
        } else {
            res.status(200).send(productFound);
        }
    } catch (error) {
        res.status(500).send("Error al buscar productos con ese id");
    }
}

    // Creamos un nuevo producto.
    async newProduct(req,res) {
        const productNew = req.body;
        try {
            if(!productNew){
                res.status(400).send("El producto que intenta crear no tiene contenido")
                return;
            } else {
                await ProductServices.addProduct(productNew);
                res.status(200).send("Se envio la solicitud exitosamente");
            }
        } catch (error) {
            res.status(500).send("No puede crearse el producto");
        }
    }

    // Actualizar un producto
    async productUpdate(req,res){
        //Recibimos el id del product y la nueva informacion del product a actualizar
        const {pid} = req.params;
        const updateData = req.body;
        try {
            if(!updateData){
                res.status(400).send("Se encuentra vacia la informacion a actualizar");
                return;
            }
            // Buscamos el producto.
            const productFound = await ProductServices.getProduct(pid);
            if (!productFound) {
                res.status(404).send(`No se encontró producto con el id ${pid}`);
                return;
            }
            // Si encontramos el producto lo actualizamos.
            await ProductServices.updateProduct(pid,updateData);
            res.status(201).send("Producto actualizado con exito!");
        } catch (error) {
            res.status(500).send("Error al actualizar el producto");
        }
    }

    // Eliminar un producto.
    async productDelete(req,res) {
        const {pid} = req.params;
        // Buscamos el producto.
        const productFound = await ProductServices.getProduct(pid);
        try {
            if(!pid){
                res.status(404).send("es necesario el id para poder eliminar el producto");
                return;
            }

            if(!productFound){
                res.status(404).send(`No se encontró producto con el id ${pid}`);
                return;
            } else {
                await ProductServices.deleteProduct(pid);
                res.status(200).send("Producto eliminado de forma exitosa");
            }


        } catch (error) {
            res.status(500).send("No es posible eliminar el producto");
        }
    }


}

export default ProductController;