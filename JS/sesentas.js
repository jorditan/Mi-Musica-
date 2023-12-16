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

const bandas60 = [
    {
        nombre: 'The Beatles',
        audio: ['../Sound/If I Fell.mp3', '../Sound/Im Happy Just To Dance With You.mp3', '../Sound/Helter Skelter.mp3', '../Sound/Help!.mp3', '../Sound/Across The Universe.mp3'],
        genero: 'Rock',
        id: 1,
        img: '../IMG/The beatles 60s (1).jpg'
    },
    {
        nombre: 'The Doors',
        audio: ['../Sound/LA Woman.mp3', '../Sound/Roadhouse Blues.mp3', '../Sound/Love Her Madly.mp3'],
        genero: 'Rock',
        id: 2,
        img: 'https://img2.rtve.es/im/3854892/?w=360'
    },
    {
        nombre: 'Led Zeppelin',
        audio: ['../Sound/Baby Come On Home.mp3', '../Sound/Black Dog.mp3', '../Sound/Whole Lotta Love.mp3', '../Sound/All My Love.mp3'],
        genero: 'Rock',
        id: 3,
        img: 'https://images.mubicdn.net/images/cast_member/53325/cache-291609-1513500009/image-w856.jpg?size=800x'
    },
    {
        nombre: 'Pink Floyd',
        audio: ['../Sound/Mother.mp3', '../Sound/High Hopes.mp3','../Sound/Fearless.mp3'],
        genero: 'Rock',
        id: 4,
        img: 'https://imagenes.elpais.com/resizer/bFHKfxYxoTuDZZALfvLzvyWKR6k=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/ICQ4BXBFXZB35MTOUNZI7R3NHA.jpg'
    },
    {
        nombre: 'Vox Dei',
        audio: ['../Sound/Ritmo y Blues con Armónica.mp3', '../Sound/Presente.mp3', '../Sound/Profecías.mp3'],
        genero: 'Rock',
        id: 5,
        img: '../IMG/vox dei (1).jpg'
    },
    {
        nombre: 'The Rolling Stones',
        audio: ['../Sound/Gimme Shelter.mp3', '../Sound/Wild Horses.mp3','../Sound/Fool To Cry.mp3'],
        genero: 'Rock',
        id: 6,
        img: '../IMG/rollings.png'
    },
]

// Selecciono los botones de reproduccion, like y nombre de cancion
const playToogleButtons = document.querySelectorAll('.playToogle');
const nextButtons = document.querySelectorAll('.next');
const nombre = document.querySelectorAll('.nombreCancion');
let id = [];

import {cambiarBandaSiHaceFalta, reproducirCancionAleatoria, 
ponerYSacarPausa, sacarPausa} 
from  "./utils.js";

// Destructuro el array de objetos para obtener las canciones de todas las bandas60


playToogleButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function() {;
        let tarjeta = elemento.closest('.tarjeta');
        let idBoton = parseInt(elemento.getAttribute('id'));
        id.push(idBoton);
        let bandaSeleccionada = bandas60.find(banda => banda.id === idBoton);
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
        let bandaSeleccionada = bandas60.find(banda => banda.id === idBoton);
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
let datosStorage = obtenerFavoritos();
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
            img: tarjeta.querySelector('.imagen').getAttribute('src'),
        }

        favearTarjeta(tarjeta, datos);
        guardarTarjetaStorage(datosStorage);
        console.log(datosStorage)
    })
})

function favearTarjeta (tarjeta, datos) {
/*
    Esta funcion se encarga de favear la tarjeta
*/
    let nombre = datos.nombre;

    if (tieneDuplicados(datosStorage, nombre)) {
        // Si la tarjeta ya está en tarjetasFaveadas, la sacamos.
        estaClickeado = false;
        datosStorage = datosStorage.filter(item => item.nombre !== nombre);
    } else {
        // Si la tarjeta no está en tarjetasFaveadas, la agregamos.
        estaClickeado = true;
        datosStorage.push(datos);
    }
}

function tieneDuplicados(datosTarjetas, nombre) {
    return datosTarjetas.some(item => item.nombre === nombre);
}

function guardarTarjetaStorage(datosStorage) {
    localStorage.setItem('localTarjeta', JSON.stringify(datosStorage));
}

function obtenerFavoritos() {
    let guardadoStorage = localStorage.getItem('localTarjeta');
    let datosTarjetasFaveadas = []
    if (guardadoStorage == null) {
        datosTarjetasFaveadas = [];
    }
    else {
        datosTarjetasFaveadas = JSON.parse(guardadoStorage);
    }
    return datosTarjetasFaveadas
}

export {mostrarScroll, id, favearTarjeta, tieneDuplicados, guardarTarjetaStorage, obtenerFavoritos, bandas60}
