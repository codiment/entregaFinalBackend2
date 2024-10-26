
// Creamos la constante para configurar el lado cliente.
const socket = io();



const productForm = document.querySelector(".productForm");
const productContainer = document.querySelector(".containerProducts");


// Recibimos los productos.
socket.on("products", (products) => {
    renderProducts(products);
});

// Actualizamos productos.
socket.on("updateProducts", (productsUpdate)=> {
    renderProducts(productsUpdate);

});

// Funcion para renderizar productos.
function renderProducts(array) {
    productContainer.innerHTML = '';

    array.forEach(product => {
        const productDiv = document.createElement("div");

        productDiv.classList.add("card");

        productDiv.id = product._id;

        productDiv.innerHTML = `
            <h3>Title: ${product.title}</h3>
            <p>Description: ${product.description}</p>
            <p>Price: ${product.price}</p>
            <div>
                <img src=${product.thumbnails} alt=${product.title}>
            </div>
            <button class="delete">Delete</button>
        `;
        productContainer.appendChild(productDiv);
 
        productDiv.querySelector("button").addEventListener("click", () => {
            productDelete(product._id);
        })

    });

}

// Funcion para eliminar productos.
function productDelete(id) {
    socket.emit("productDelete", id);
}

// Conectamos y renderizamos form con el evento submit.

productForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
     
    const formData = new FormData(productForm);
    
    const productData = Object.fromEntries(formData.entries());

    socket.emit("newProduct", productData);
    
    productForm.reset();
});



