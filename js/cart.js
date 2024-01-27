import productos from './productos-lista.js';

document.addEventListener("DOMContentLoaded", function () {
    mostrarProductosEnCarrito();

    function mostrarProductosEnCarrito() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const cartItemsContainer = document.querySelector(".cart-items");

        if (carrito.length === 0) {
            cartItemsContainer.innerHTML = "<p>El carrito está vacío</p>";
        } else {
            carrito.forEach(item => {
                mostrarProductoEnCarrito(item);
            });

            mostrarResumenDelCarrito(carrito);
        }
    }

    function mostrarProductoEnCarrito(item) {
        const cartItemsContainer = document.querySelector(".cart-items");
        const productoHTML = document.createElement("div");
    
        const precioUnitario = item.precioUnitario || 0;
    
        if (typeof precioUnitario !== 'number') {
            console.error("Error: precioUnitario no es un número:", precioUnitario);
            return;
        }
    
        const total = precioUnitario * item.cantidad;
    
        productoHTML.innerHTML = `
            <div>
                <h3>Producto: ${obtenerNombreProducto(item.productId)}</h3>
                <p>Cantidad: ${item.cantidad}</p>
                <p>Precio Unitario: $${precioUnitario.toFixed(2)}</p>
                <p>Total: $${total.toFixed(2)}</p>
            </div>
        `;
    
        cartItemsContainer.appendChild(productoHTML);
    }
    

    function obtenerNombreProducto(productId) {
        const producto = productos.find(producto => producto.id === productId);
        return producto ? `${producto.nombre}` : "Producto Desconocido";
    }   

    function mostrarResumenDelCarrito(carrito) {
        const cartSummaryContainer = document.querySelector(".cart-summary");
        const precioTotal = calcularPrecioTotal(carrito);
        const descuento = precioTotal > 40000 ? precioTotal * 0.05 : 0;

        cartSummaryContainer.innerHTML = `
            <h2>Resumen del Carrito</h2>
            <p>Precio Total: $${precioTotal.toFixed(2)}</p>
            <p>Descuento: $${descuento.toFixed(2)}</p>
            <p>Precio con Descuento: $${(precioTotal - descuento).toFixed(2)}</p>
            <button id="confirmarCompraBtn">Confirmar Compra</button>
        `;

        const confirmarCompraBtn = document.getElementById("confirmarCompraBtn");
        confirmarCompraBtn.addEventListener("click", confirmarCompra);
    }

    function calcularPrecioTotal(carrito) {
        return carrito.reduce((total, item) => {
            const producto = productos.find(producto => producto.id === item.productId);
            const precioUnitario = producto ? producto.precio : 0;
            // const precioUnitario = item.precioUnitario || 0;
            return total + precioUnitario * item.cantidad;
        }, 0);
    }

    function confirmarCompra() {
        Swal.fire({
            icon: 'success',
            title: '¡Compra confirmada!',
            text: 'Gracias por tu compra.',
            confirmButtonColor: '#7D2FF6',
        }).then(() => {
            limpiarCarrito();
            window.location.href = "../index.html";
        });
    }

    function limpiarCarrito() {
        localStorage.removeItem("carrito");

        mostrarProductosEnCarrito();
    }
});
