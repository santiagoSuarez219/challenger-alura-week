async function listarProductos() {
    const conexion = await fetch("http://localhost:3000/productos")
    const productos = await conexion.json()
    return productos
}

async function crearProducto(nombre, precio, imagen) {
    const request = await fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            precio,
            imagen,

        })
    })
    const response = await request.json()
    return response 
}

async function eliminarProducto(id) {
    const response = await fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
    })
    return response
}

export const conexionAPI = {
    listarProductos,
    crearProducto,
    eliminarProducto,
}