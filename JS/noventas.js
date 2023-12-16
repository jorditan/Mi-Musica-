import {
     ponerYSacarPausa, sacarPausa,
     reproducirCancionAleatoria, cambiarBandaSiHaceFalta
}
     from './utils.js';

import {favearTarjeta, guardarTarjetaStorage, mostrarScroll }
     from './sesentas.js';

const animado = document.querySelectorAll('.animado');
window.addEventListener('scroll', mostrarScroll);
     

const bandas90 = [
     {
          id: 1,
          nombre: 'Radiohead',
          audio: ['../Sound/How to Disappear Completely.mp3', '../Sound/All I Need.mp3', '../Sound/No Suprises.mp3'],
          genero: 'Rock',
          img: 'https://lastfm.freetls.fastly.net/i/u/500x500/6cdbb308dd94480697ce679e4968262b.jpg'
     },
     {
          id: 2,
          nombre: 'Nirvana',
          audio: ['../Sound/About A Girl.mp3', '../Sound/PennyRoyal Tea.mp3', '../Sound/You Know You re Right.mp3'],
          genero: 'Rock',
          img: 'https://globalnews.ca/wp-content/uploads/2018/05/kurt-cobain-guitar-unplugged.jpg?quality=85&strip=all',
     },
     {
          id: 3,
          nombre: 'Oasis',
          audio: ['../Sound/Live Forever.mp3', '../Sound/Champagne Supernova.mp3', '../Sound/Married With Children.mp3'],
          genero: 'Rock',
          img: 'https://i.guim.co.uk/img/media/204440b01b1c17784f232e9c4f7f993e25d052db/47_2399_4304_2580/master/4304.jpg?width=1200&quality=85&auto=format&fit=max&s=f83c3dd333957168cc87e229145654e1',
     },
     {
          id: 4,
          nombre: 'Babasónicos',
          audio: ['../Sound/Montañas de Agua.mp3', '../Sound/Perfume Casino.mp3', '../Sound/Esther Narcotica.mp3'],
          genero: 'Pop',
          img: 'https://mapsound.ar/wp-content/uploads/2020/10/Babasonicos_02.jpg'
     },
     {
          id: 5,
          nombre: 'Blink-182',
          audio: ['../Sound/Pronta Entrega.mp3', '../Sound/Imágenes Paganas.mp3', '../Sound/Luna de Miel en la mano.mp3'],
          genero: 'Pop',
          img: 'https://media.newyorker.com/photos/590978f12179605b11ad8a08/master/pass/Petrusich-RevivingthePop-PunkInnocenceofBlink182.jpg'
     },
     {
          id: 6,
          nombre: 'Linkin Park',
          audio: ['../Sound/One.mp3', '../Sound/Whiskey In The Jar.mp3', '../Sound/Battery.mp3'],
          genero: 'Rock',
          img: 'https://anewfriend.files.wordpress.com/2017/07/20155992_1355622131221434_7019139219057796853_n.jpg?w=584'
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
     })
})

export { bandas90 }
