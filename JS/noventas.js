import {
     ponerYSacarPausa, sacarPausa,
     reproducirCancionAleatoria, cambiarBandaSiHaceFalta, sound
}
     from './utils.js';

import { mostrarScroll, favearTarjeta, guardarTarjetaStorage}
     from './sesentas.js';

window.addEventListener('scroll', mostrarScroll);

const bandas90 = [
     {
          id: 1,
          nombre: 'Radiohead',
          audio: ['../Sound/How to Disappear Completely.mp3', '../Sound/All I Need.mp3', '../Sound/No Suprises.mp3'],
          genero: 'Rock'
     },
     {
          id: 2,
          nombre: '',
          audio: ['../Sound/About A Girl.mp3', '../Sound/PennyRoyal Tea.mp3', '../Sound/You Know You re Right.mp3'],
          genero: 'Rock',
     },
     {
          id: 3,
          nombre: 'Guns N Roses',
          audio: ['../Sound/Live Forever.mp3', '../Sound/Champagne Supernova.mp3', '../Sound/Married With Children.mp3'],
          genero: 'Rock',
     },
     {
          id: 4,
          nombre: 'Soda Stereo',
          audio: ['../Sound/Montañas de Agua.mp3', '../Sound/Perfume Casino.mp3', '../Sound/Esther Narcotica.mp3'],
          genero: 'Rock Pop',
     },
     {
          id: 5,
          nombre: 'Virus',
          audio: ['../Sound/Pronta Entrega.mp3', '../Sound/Imágenes Paganas.mp3', '../Sound/Luna de Miel en la mano.mp3'],
          genero: 'Pop',
     },
     {
          id: 6,
          nombre: 'Metallica',
          audio: ['../Sound/One.mp3', '../Sound/Whiskey In The Jar.mp3', '../Sound/Battery.mp3'],
          genero: 'Hard Rock',
     },
]


const id = []
const playToogleButtons = document.querySelectorAll('.playToogle4')
const nextButtons = document.querySelectorAll('.next4')
const nombre = document.querySelectorAll('.nombreCancion');

playToogleButtons.forEach(function (elemento) {
     elemento.addEventListener('click', function () {
          ;
          let tarjeta = elemento.closest('.tarjeta');
          let idBoton = parseInt(elemento.getAttribute('id'));
          id.push(idBoton);
          let bandaSeleccionada = bandas90.find(banda => banda.id === idBoton);
          let cancionesBanda = bandaSeleccionada.audio;

          /*
               Selecciono la tarjeta, el ID y las canciones de la banda
               correspondiente a la tarjeta clickeada
          */

          ponerYSacarPausa(elemento)
          cambiarBandaSiHaceFalta(id, idBoton, cancionesBanda, tarjeta);
     });
});


nextButtons.forEach(function (elemento) {
     elemento.addEventListener('click', function () {
          let tarjeta = elemento.closest('.tarjeta');
          let idBoton = parseInt(tarjeta.querySelector('.playToogle4').getAttribute('id'));
          id.push(idBoton);
          let bandaSeleccionada = bandas90.find(banda => banda.id === idBoton);
          let cancionesBanda = bandaSeleccionada.audio;
          /*
               Selecciono la tarjeta, el ID y las canciones de la banda
               correspondiente a la tarjeta clickeada
          */

          reproducirCancionAleatoria(cancionesBanda, tarjeta);
          sacarPausa(tarjeta.querySelector('.play'));
     })
})

// FUNCIONALIDAD LIKES PARA EL LOCAL STORAGE //

const likes = document.querySelectorAll('.like-2');
let datosTarjetasFaveadas = [];
let estaClickeado = false;


likes.forEach(function (like) {
     like.addEventListener('click', function () {
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

export {bandas90}
