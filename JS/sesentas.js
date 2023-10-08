// Animacion aparición de tarjetas al scrollear

const animado = document.querySelectorAll('.animado');

function mostrarScroll() {
    let scrollTop = document.documentElement.scrollTop;

    for (let i = 0; i < animado.length; i++) {
        let alturaAnimado = animado[i].offsetTop;
        if (alturaAnimado - 400 < scrollTop) {
            animado[i].style.opacity = 1;
        }
    }
}

window.addEventListener('scroll', mostrarScroll);


// Determino los valores de las tarjetas

const bandas = [
    {
        nombre: 'The Beatles',
        audio: ['../Sound/If I Fell.mp3', '../Sound/Im Happy Just To Dance With You.mp3', '../Sound/Helter Skelter.mp3', '../Sound/Help!.mp3', '../Sound/Across The Universe.mp3'],
        genero: 'Rock',
        id: 1,
    },
    {
        nombre: 'The Doors',
        audio: ['../Sound/LA Woman.mp3', '../Sound/Roadhouse Blues.mp3', '../Sound/Love Her Madly.mp3'],
        genero: 'Rock',
        id: 2
    },
    {
        nombre: 'Led Zeppelin',
        audio: ['../Sound/Baby Come On Home.mp3', '../Sound/Black Dog.mp3', '../Sound/Whole Lotta Love.mp3', '../Sound/All My Love.mp3'],
        genero: 'Rock',
        id: 3
    },
    {
        nombre: 'Pink Floyd',
        audio: ['../Sound/Mother.mp3', '../Sound/High Hopes.mp3','../Sound/Fearless.mp3'],
        genero: 'Rock',
        id: 4
    },
    {
        nombre: 'Vox Dei',
        audio: ['../Sound/Ritmo y Blues con Armónica.mp3', '../Sound/Presente.mp3', '../Sound/Profecías.mp3'],
        genero: 'Rock',
        id: 5
    },
    {
        nombre: 'The Rolling Stones',
        audio: ['../Sound/Gimme Shelter.mp3', '../Sound/Wild Horses.mp3','../Sound/Fool To Cry.mp3'],
        genero: 'Rock',
        id: 6
    },
]

// Selecciono los botones de reproduccion, like y nombre de cancion
const playToogleButtons = document.querySelectorAll('.playToogle');
const nextButtons = document.querySelectorAll('.next');
const nombre = document.querySelectorAll('.nombreCancion');
let id = [];

import {imprimirNombreCancion, cambiarBandaSiHaceFalta, reproducirCancionAleatoria, 
ponerYSacarPausa, sacarPausa, sacarPlay, generarDatoRandom, obtenerCancioncesBandas} 
from  "./utils.js";

// Destructuro el array de objetos para obtener las canciones de todas las bandas


playToogleButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function() {;
        let tarjeta = elemento.closest('.tarjeta');
        let idBoton = parseInt(elemento.getAttribute('id'));
        id.push(idBoton);
        let bandaSeleccionada = bandas.find(banda => banda.id === idBoton);
        console.log(bandaSeleccionada)
        let cancionesBanda = bandaSeleccionada.audio;
        
        /*
            Selecciono la tarjeta, el ID y las canciones de la banda
            correspondiente a la tarjeta clickeada
        */

        ponerYSacarPausa(elemento);
        cambiarBandaSiHaceFalta(id, idBoton, cancionesBanda, tarjeta);
    });
});


nextButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function () {
        let tarjeta = elemento.closest('.tarjeta');
        let idBoton = parseInt(tarjeta.querySelector('.playToogle').getAttribute('id'));
        id.push(idBoton);
        let bandaSeleccionada = bandas.find(banda => banda.id === idBoton);
        let cancionesBanda = bandaSeleccionada.audio;
        /*
            Selecciono la tarjeta, el ID y las canciones de la banda
            correspondiente a la tarjeta clickeada
        */

        reproducirCancionAleatoria(cancionesBanda, tarjeta);
        sacarPausa(tarjeta.querySelector('.play'));
    })
})


// ----------------------------------------------------------------------------------

/*
    Esta seccion del código se encargar de desarrollar
    una manera de guardar en el local storage las tarjetas con like
*/

const likes = document.querySelectorAll('.like');
let datosTarjetasFaveadas = [];
let estaClickeado = false;

likes.forEach(function(like) {
    /*
        Arego evento de like, seleccionando la tarjeta y sus datos 
        correspondientes.
    */
    like.addEventListener('click', () => {
        let tarjeta = like.closest('.tarjeta');
        let datos = {
            nombre: tarjeta.querySelector('.nombreBanda').innerHTML,
            id: tarjeta.getAttribute('id'),
            url: './HTML/60s.html',
            img: tarjeta.querySelector('.imagen').getAttribute('src'),
        }

        favearTarjeta(tarjeta, datos);
        guardarTarjetaStorage(datosTarjetasFaveadas);
        console.log(datosTarjetasFaveadas)
    })
})

function favearTarjeta (tarjeta, datos) {
/*
    Esta funcion se encarga de favear la tarjeta
*/
    let id = datos.id;

    if (tieneDuplicados(datosTarjetasFaveadas, id)) {
        // Si la tarjeta ya está en tarjetasFaveadas, la sacamos.
        estaClickeado = false;
        datosTarjetasFaveadas = datosTarjetasFaveadas.filter(item => item.id !== id);
    } else {
        // Si la tarjeta no está en tarjetasFaveadas, la agregamos.
        estaClickeado = true;
        datosTarjetasFaveadas.push(datos);
    }
}

function tieneDuplicados(array, id) {
    return array.some(item => item.id === id);
}

function guardarTarjetaStorage(datosTarjetasFaveadas) {
    localStorage.setItem('localTarjeta', JSON.stringify(datosTarjetasFaveadas));
}

function obtenerFavoritos() {
    let guardadoStorage = localStorage.getItem('localTarjeta');
    if (guardadoStorage == null) {
        datosTarjetasFaveadas = [];
    }
    else {
        datosTarjetasFaveadasarjetasFaveadas = JSON.parse(guardadoStorage);
    }
    return datosTarjetasFaveadas()
}


export {mostrarScroll, id}