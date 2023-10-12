import  {obtenerCancioncesBandas,  ponerYSacarPausa, sacarPausa,
    reproducirCancionAleatoria, cambiarBandaSiHaceFalta, sound
    }
    from './utils.js';
    
    import { mostrarScroll, favearTarjeta, guardarTarjetaStorage, obtenerFavoritos} 
    from './sesentas.js';

window.addEventListener('scroll', mostrarScroll);

const bandas = [
    {
        id: 1,
        nombre: 'Van Halen',
        audio: ['../Sound/Oh Pretty Woman.mp3', '../Sound/Panama.mp3', '../Sound/Romeo Delight.mp3'],
        genero: 'Rock'
    },
    {
        id: 2,
        nombre: 'Quiet Riot',
        audio: ['../Sound/Twilight Hotel.mp3', '../Sound/Mama Weer All Creazy now.mp3', '../Sound/Cum On Feel The Noise.mp3'],
        genero: 'Rock',
    },
    {
        id: 3,
        nombre: 'Guns N Roses',
        audio: ['../Sound/Welcome to the Jungle.mp3', '../Sound/Patience.mp3', '../Sound/Nightrain.mp3'],
        genero: 'Rock',
    },
    {
        id: 4,
        nombre: 'Soda Stereo',
        audio: ['../Sound/Te Hacen Falta Vitaminas.mp3', '../Sound/Nada Personal.mp3', '../Sound/Juego de Seduccion.mp3'],
        genero: 'Rock Pop',
    },
    {
        id: 5,
        nombre: 'Virus',
        audio: ['..Sound/Pronta Entrega.mp3', '../Sound/Imágenes Paganas.mp3', '../Sound/Luna de Miel en la mano.mp3'],
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
const playToogleButtons = document.querySelectorAll('.playToogle3')
const nextButtons = document.querySelectorAll('.next3')
const nombre = document.querySelectorAll('.nombreCancion');

playToogleButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function() {;
        let tarjeta = elemento.closest('.tarjeta');
        let idBoton = parseInt(elemento.getAttribute('id'));
        id.push(idBoton);
        let bandaSeleccionada = bandas.find(banda => banda.id === idBoton);
        let cancionesBanda = bandaSeleccionada.audio;
        
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
        let idBoton = parseInt(tarjeta.querySelector('.playToogle3').getAttribute('id'));
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
            url: './HTML/70s.html',
            img: tarjeta.querySelector('.imagen').getAttribute('src'),
        }

        favearTarjeta(tarjeta, datos);
        guardarTarjetaStorage(datosTarjetasFaveadas);
        console.log(datosTarjetasFaveadas)
    })
})
