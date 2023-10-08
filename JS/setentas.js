import  {obtenerCancioncesBandas,  ponerYSacarPausa, sacarPausa,
reproducirCancionAleatoria, cambiarBandaSiHaceFalta, sound
}

from './utils.js';
import { mostrarScroll} from './sesentas.js';

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
        audio: [''],
        genero: 'Rock'
    },
    {
        nombre: 'Blondie',
        id: 3,
        audio: [''],
        genero: 'Rock'
    },
    {
        nombre: 'Aerosmith',
        id: 4,
        audio: [''],
        genero: 'Rock'
    },
    {
        nombre: 'Invisible',
        id: 5,
        audio: [''],
        genero: 'Rock progresivo'
    },
    {
        nombre: 'Ramones',
        id: 6,
        audio: [''],
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
