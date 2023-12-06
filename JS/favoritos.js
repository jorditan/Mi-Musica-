import { guardarTarjetaStorage, obtenerFavoritos } from "./sesentas.js";

const guardadoStorage = obtenerFavoritos();

const listDeFavoritos = document.getElementById('misFavs');

guardadoStorage.forEach(guardado => {
     const banda = document.createElement('div')
     banda.classList.add('tarjetaFav');
     const datosBanda = obtenerDatos(guardado);

     const nombreBanda = document.createElement('h1');
     const imagenBanda = document.createElement('img');
     imagenBanda.src = datosBanda.imagen;
     nombreBanda.textContent = datosBanda.nombre;

     const headerTarjeta = document.createElement('div');
     const contenedorImagen = document.createElement('div');
     headerTarjeta.appendChild(nombreBanda);
     contenedorImagen.appendChild(imagenBanda);
     banda.appendChild(headerTarjeta);
     headerTarjeta.appendChild(contenedorImagen);
     listDeFavoritos.appendChild(banda);

     contenedorImagen.classList.add('contenedorImagenFaveada')
     nombreBanda.classList.add('nombreBanda');
     headerTarjeta.classList.add('headerTarjeta');
     
});

function obtenerDatos(elemento) {
     const nombre = elemento.nombre;
     const imagen = elemento.img;
     return {nombre, imagen}
}
