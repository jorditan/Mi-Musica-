import  { ponerYSacarPausa, sacarPausa,
reproducirCancionAleatoria, cambiarBandaSiHaceFalta, sound
}
from './utils.js';

import { mostrarScroll, favearTarjeta, guardarTarjetaStorage} 
from './sesentas.js';

window.addEventListener('scroll', mostrarScroll);

const bandas = [
    {
        nombre: 'Sui Generis',
        id: 1,
        audio: ['../Sound/Necesito.mp3', '../Sound/Cuando Te Vayas.mp3', '../Sound/El fantasma de Canterville.mp3'],
        genero: 'Rock'
    },
    {
        nombre: 'AC/DC',
        id: 2,
        audio: ['../Sound/You Shook Me All Night Long.mp3', '../Sound/Black Ice.mp3', '../Sound/Let There Be Rock.mp3'],
        genero: 'Rock'
    },
    {
        nombre: 'Blondie',
        id: 3,
        audio: ['../Sound/Maria.mp3', '../Sound/Call Me.mp3', '../Sound/Heart Of Glass.mp3'],
        genero: 'Rock'
    },
    {
        nombre: 'Aerosmith',
        id: 4,
        audio: ['../Sound/Dream On.mp3', '../Sound/Walk This Way.mp3', '../Sound/Make It.mp3'],
        genero: 'Rock'
    },
    {
        nombre: 'Invisible',
        id: 5,
        audio: ['../Sound/El Anillo Del Capitan Beto.mp3', '../Sound/Elementales Leches.mp3', '../Sound/Los Libros De La Buena Memoria.mp3'],
        genero: 'Rock progresivo'
    },
    {
        nombre: 'Ramones',
        id: 6,
        audio: ['../Sound/Blitzkrieg Bop.mp3', '../Sound/Pet Sementary.mp3', '../Sound/I Wanna Be Sedated.mp3'],
        genero: 'Rock'
    }
]

const id = []
const playToogleButtons = document.querySelectorAll('.playToogle2')
const nextButtons = document.querySelectorAll('.next2')
const nombre = document.querySelectorAll('.nombreCancion');

playToogleButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function() {;
        let tarjeta = elemento.closest('.tarjeta');
        let idBoton = parseInt(elemento.getAttribute('id'));
        id.push(idBoton);
        console.log(id)
        let bandaSeleccionada = bandas.find(banda => banda.id === idBoton);
        let cancionesBanda = bandaSeleccionada.audio;
        console.log(cancionesBanda)
        
        /*
            Selecciono la tarjeta, el ID y las canciones de la banda
            correspondiente a la tarjeta clickeada
        */

        ponerYSacarPausa(elemento)
        cambiarBandaSiHaceFalta(id, idBoton, cancionesBanda, tarjeta);
    });
});


nextButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function () {
        let tarjeta = elemento.closest('.tarjeta');
        let idBoton = parseInt(tarjeta.querySelector('.playToogle2').getAttribute('id'));
        id.push(idBoton);
        let bandaSeleccionada = bandas.find(banda => banda.id === idBoton);
        let cancionesBanda = bandaSeleccionada.audio;
        /*
            Selecciono la tarjeta, el ID y las canciones de la banda
            correspondiente a la tarjeta clickeada
        */
        console.log(cancionesBanda)
        reproducirCancionAleatoria(cancionesBanda, tarjeta);
        sacarPausa(tarjeta.querySelector('.play'));
    })
})

// FUNCIONALIDAD LIKES PARA EL LOCAL STORAGE //

const likes = document.querySelectorAll('.like-2');
let datosTarjetasFaveadas = [];
let estaClickeado = false;


likes.forEach(function(like) {
    like.addEventListener('click', function() {
        let tarjeta = like.closest('.tarjeta');
        let datos = {
            nombre: tarjeta.querySelector('.nombreBanda').innerHTML,
            id: tarjeta.getAttribute('id'),
            img: tarjeta.querySelector('.imagen').getAttribute('src'),
        }

        favearTarjeta(tarjeta, datos);
        guardarTarjetaStorage(datosTarjetasFaveadas);
        console.log(datosTarjetasFaveadas)
    })
})



