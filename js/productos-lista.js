let productos = [];

async function cargarProductos() {
    try {
        const response = await fetch('../productos.json');

        if (!response.ok) {
            throw new Error('No se pudo cargar la lista de productos');
        }

        productos = await response.json();
    } catch (error) {
        console.error(error.message);
    }
}

export { productos, cargarProductos };

