

// Limpiar el carrito
document.querySelector('.cleanCart').addEventListener('click', async () => {
    const { value: confirm } = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción eliminará todos los productos de tu carrito.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, limpiar carrito!'
    });

    if (confirm) {
        try {
            // Obtener el `cartId` del atributo `data-cart-id` en el DOM
            const cartId = document.querySelector('.cartContainer').getAttribute('data-cart-id');

            if (!cartId) {
                throw new Error('No se encontró el ID del carrito.');
            }

            // Petición DELETE al backend utilizando el `cartId`
            const response = await fetch(`/api/carts/${cartId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                Swal.fire('Carrito Limpiado!', 'Todos los productos han sido eliminados.', 'success');
                document.querySelector('.cartContainer').innerHTML = '<p>El carrito está vacío.</p>';
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al limpiar el carrito.');
            }
        } catch (error) {
            Swal.fire('Error!', error.message, 'error');
        }
    }
});

// Finalizar la compra

document.querySelector('.buyCart').addEventListener('click', async () => {
    try {
        // Obtener el cartId desde el atributo
        const cartId = document.querySelector('.cartContainer').getAttribute('data-cart-id');

        if (!cartId) {
            throw new Error('No se encontró el ID del carrito.');
        }

        // Confirmación de la compra
        const { value: confirm } = await Swal.fire({
            title: '¿Estás listo para comprar?',
            text: "Asegúrate de que tu carrito esté correcto.",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, comprar!'
        });

        if (confirm) {
            // Hacer la solicitud de compra
            const purchaseResponse = await fetch(`/api/carts/${cartId}/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const result = await purchaseResponse.json();
            console.log(result);

            // Estoy teniendo un problema en la vista, el ticket se genera igual en el back, pero si quedan productos en el carrito va a lanzar el mensaje de error, pero el ticket se genera igual en la base, y los productos sin stock quedan en el carrito (MODIFICAR)

            if (result.success && result.purchaseTicket) {
                // Redirigir a la página del ticket usando el código del ticket
                console.log(result.purchaseTicket.code);
                window.location.href = `/ticket/${result.purchaseTicket.code}`;
            } else {
                // Manejar los productos fuera de stock
                if (result.outStockProducts && result.outStockProducts.length > 0) {
                    Swal.fire({
                        title: 'Error!',
                        text: `No hay suficiente stock para: ${result.outStockProducts.map(p => p.product.title).join(', ')}`,
                        icon: 'error'
                    });
                } else {
                    Swal.fire('Error!', result.message || 'No se pudo procesar la compra.', 'error');
                }
            }
        }
    } catch (error) {
        console.error("Error al intentar realizar la compra:", error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al intentar realizar la compra. Por favor, intenta nuevamente más tarde.',
            icon: 'error'
        });
    }
});
