class ProductDTO {
    constructor({ title, description, code, price, stock, category, thumbnails }) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails || [];
        this.status = true;
    }
}

export default ProductDTO;