import  {mostrarScroll, obtenerCancioncesBandas, playToogleButtons, nextButtons, ponerYSacarPausa, generarDatoRandom,
reproducirCancionAleatoria, cambiarBandaSiHaceFalta, id}
from './decadas.js';

window.addEventListener('scroll', mostrarScroll);

const bandas = [
    {
        nombre: 'Sui Generis',
        id: 1,
        audio: ['Hola'],
        genero: 'Rock'
    },
    {
        nombre: 'AC/DC',
        id: 2,
        audio: [],
        genero: 'Rock'
    },
    {
        nombre: 'Blondie',
        id: 3,
        audio: [],
        genero: 'Rock'
    },
    {
        nombre: 'Aerosmith',
        id: 4,
        audio: [],
        genero: 'Rock'
    },
    {
        nombre: 'Invisible',
        id: 5,
        audio: [],
        genero: 'Rock progresivo'
    },
    {
        nombre: 'Ramones',
        id: 6,
        audio: [],
        genero: 'Rock'
    }
]


const cancionesBandas = obtenerCancioncesBandas(bandas)
console.log(cancionesBandas)

playToogleButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function() {;
        let tarjeta = elemento.closest('.tarjeta');
        let idBoton = parseInt(elemento.getAttribute('id'));
        id.push(idBoton);
        let bandaSeleccionada = bandas.find(banda => banda.id === idBoton);
        let cancionesBanda = bandaSeleccionada.audio;
        console.log(cancionesBanda)
        
        /*
            Selecciono la tarjeta, el ID y las canciones de la banda
            correspondiente a la tarjeta clickeada
        */

        ponerYSacarPausa(this, cancionesBanda, tarjeta);
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
