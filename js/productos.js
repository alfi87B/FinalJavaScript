import productos from './productos-lista.js';

document.addEventListener("DOMContentLoaded", function () {

    const botonesAgregar = document.querySelectorAll(".agregar-al-carrito");
    const filtroCategorias = document.getElementById("filtroCategorias");

    botonesAgregar.forEach(function (button) {
        button.addEventListener("click", function () {
            agregarAlCarrito(button);
        });
    });

    filtroCategorias.addEventListener("click", function (event) {
        const categoriaSeleccionada = event.target.innerText;
        filtrarTarjetasPorCategoria(categoriaSeleccionada);
    });

    function filtrarTarjetasPorCategoria(categoria) {
        const tarjetas = document.querySelectorAll(".card");
        tarjetas.forEach(function (tarjeta) {
            const categoriaTarjeta = tarjeta.getAttribute("data-categoria");
            const mostrar = categoria === categoriaTarjeta || categoria === "TODAS";

            tarjeta.style.display = mostrar ? "block" : "none";
        });
    }

    function agregarAlCarrito(button) {
        const productId = button.getAttribute("data-product-id");
        const productPrice = obtenerPrecioProducto(productId);

        agregarAlCarritoLocalStorage(productId, productPrice);
    }

    function obtenerPrecioProducto(productId) {
        const producto = productos.find(producto => producto.id === productId);
        return producto ? producto.precio : 0;
    }

    function agregarAlCarritoLocalStorage(productId, productPrice) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const productoEnCarrito = carrito.find(item => item.productId === productId);
    
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({ productId, cantidad: 1, precioUnitario: productPrice });
        }
    
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCantidadEnCarrito(carrito);
        console.log("Producto agregado al carrito:", productId);
    }
    
    function mostrarCantidadEnCarrito(carrito) {
        const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
        const cartIcon = document.querySelector(".busca-cart .cart");
    
        const cantidadElement = document.createElement("span");
        cantidadElement.classList.add("cart-count");
        cantidadElement.textContent = cantidadTotal;
    
        const existingCount = document.querySelector(".busca-cart .cart-count");
        if (existingCount) {
            existingCount.remove();
        }
    
        cartIcon.appendChild(cantidadElement);
    }
});