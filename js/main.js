import { conexionAPI } from './conexionAPI.js';

const lista = document.querySelector('#lista-productos');
const form = document.querySelector('#form-producto');
const botonLimpiar = document.querySelector('#boton-limpiar');
const contenedorProductos =  document.querySelector('#contenedor-productos');

function crearCard(id, nombre, precio, imagen) {
    const producto = document.createElement('div');
    producto.className = "product__card";
    producto.setAttribute('data-id', id);
    producto.innerHTML = `
        <figure class="product__image">
            <img src="${imagen}" alt="image-${nombre}" />
        </figure>
        <h3 class="product__name">${nombre}</h3>
        <div class="product__text">
            <p class="product__price">$ ${precio}</p>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox ="0 0 24 24"
                fill="currentColor"
                class="size-6"
            >
            <path
                fill-rule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clip-rule="evenodd"
            />
            </svg>
    `
    const deleteButton = producto.querySelector('svg');
    deleteButton.addEventListener('click', async () => {
        await conexionAPI.eliminarProducto(id);
        producto.remove();
    });

    return producto;
}

function verificarProductos() {
    const alerta = document.createElement('div');
    alerta.className = "products__no-products";
    alerta.innerHTML = `<h2 class="no-productos__message">No se han agregado productos</h2>`
    return alerta;
}

async function listarProductos() {
    const listaAPI = await conexionAPI.listarProductos();
    if (listaAPI.length === 0) {
        contenedorProductos.appendChild(verificarProductos(listaAPI.length));
    } else {
        listaAPI.forEach(producto => lista.appendChild(crearCard(
            producto.id,
            producto.nombre,
            producto.precio,
            producto.imagen,
        )))
    }
}

async function agregarProducto(evento) {
    evento.preventDefault();
    const nombre = document.querySelector('#nombre').value;
    const precio = document.querySelector('#precio').value;
    const imagen = document.querySelector('#imagen').value;

    await conexionAPI.crearProducto(nombre, precio, imagen);

    const producto = crearCard(nombre, precio, imagen);
    lista.appendChild(producto);
    form.reset();
}

form.addEventListener("submit", evento => agregarProducto(evento))
botonLimpiar.addEventListener("click", () => form.reset())

listarProductos();
