export async function obtenerCotizacionDolarBlue() {
    try {
        const response = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
        const data = await response.json();

        const dolarBlue = data.find(item => item.casa.nombre === 'Dolar Blue');

    if (dolarBlue) {
        const compra = dolarBlue.casa.compra;
        const venta = dolarBlue.casa.venta;

        return { compra, venta };
        } else {
        throw new Error('No se encontró la cotización del dólar blue');
        }
    } catch (error) {
        console.error('Error al obtener la cotización del dólar blue', error);
        throw error;
    }
}
