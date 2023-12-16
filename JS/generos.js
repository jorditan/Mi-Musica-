import { bandas60 } from './sesentas.js';
import { bandas70 } from './setentas.js';
import { bandas80 } from './ochentas.js';
import { bandas90 } from './noventas.js';
import { ponerYSacarPausa, sacarPausa, reproducirCancionAleatoria, cambiarBandaSiHaceFalta, cambiarBandaSiHaceFaltaGeneros }
     from './utils.js';


const bandasTotales = bandas60.concat(bandas70, bandas80, bandas90);

function obtenerBandas(genero, bandas) {
     const bandasRock = bandas.filter(banda => banda.genero == genero);
     return bandasRock;
}

const bandasRock = obtenerBandas('Rock', bandasTotales);
const contenedorTarjetas = document.getElementById('contenedorTarjetas');
let contadorTarjetas = 0;


bandasRock.forEach(banda => {
     contadorTarjetas++;
     const playButton = document.createElement('i');
     const nextButton = document.createElement('i');
     const tarjeta = document.createElement('div');
     const contenedorImagen = document.createElement('div');
     const infoTarjeta = document.createElement('div');
     const nombreBanda = document.createElement('h4');
     const nombreCancion = document.createElement('p');
     const imagen = document.createElement('img');
     const botones = document.createElement('div');
     const botonPlay = document.createElement('button');

     playButton.classList.add('fa-solid', 'fa-play', 'play');
     nextButton.classList.add('fa-solid', 'fa-forward');
     botones.classList.add('botones');
     imagen.classList.add('imagen');
     nombreBanda.classList.add('nombreBanda');
     nombreCancion.classList.add('nombreCancion');
     contenedorImagen.classList.add('contenedorImagen');
     infoTarjeta.classList.add('infoTarjeta');
     tarjeta.classList.add('tarjeta');
     botonPlay.classList.add('playToogle');
     imagen.src = banda.img;

     tarjeta.setAttribute('id', `${contadorTarjetas}`);
     tarjeta.dataset.nombreBanda = banda.nombre;
     contenedorImagen.appendChild(imagen);
     playButton.setAttribute('id', `${contadorTarjetas}`);
     tarjeta.appendChild(contenedorImagen);
     tarjeta.appendChild(infoTarjeta);
     infoTarjeta.appendChild(nombreBanda);
     infoTarjeta.appendChild(nombreCancion);
     infoTarjeta.appendChild(botones);
     botones.appendChild(botonPlay);
     botonPlay.appendChild(playButton);
     botones.appendChild(nextButton);
     contenedorTarjetas.appendChild(tarjeta);
     nombreBanda.textContent = banda.nombre;
     nombreCancion.textContent = 'Toca para reproducir...'
})

const playToogleButtons = document.querySelectorAll('.playToogle');
const nextButtons = document.querySelectorAll('.fa-forward');
let nombresBandasReproducidas = [];

playToogleButtons.forEach(playButton => {
     playButton.addEventListener('click', function () {
          let tarjeta = playButton.closest('.tarjeta');
          const nombreBanda = tarjeta.dataset.nombreBanda;
          let bandaSeleccionada = bandasRock.find(banda => banda.nombre === nombreBanda);
          nombresBandasReproducidas.push(bandaSeleccionada.nombre);
          let cancionesBanda = bandaSeleccionada.audio;
          /*
               Selecciono la tarjeta, el nombre de la banda y las canciones de la banda
               correspondiente a la tarjeta clickeada
          */
          ponerYSacarPausa(playButton);
          cambiarBandaSiHaceFaltaGeneros(nombresBandasReproducidas, nombreBanda, cancionesBanda, tarjeta);
     })
})


nextButtons.forEach(nextButton => {
     nextButton.addEventListener('click', function () {
          let tarjeta = nextButton.closest('.tarjeta');
          const nombreBanda = tarjeta.dataset.nombreBanda;
          nombresBandasReproducidas.push(nombreBanda);
          let bandaSeleccionada = bandasRock.find(banda => banda.nombre === nombreBanda);
          let cancionesBanda = bandaSeleccionada.audio;
          /*
               Selecciono la tarjeta, el ID y las canciones de la banda
               correspondiente a la tarjeta clickeada
          */

          reproducirCancionAleatoria(cancionesBanda, tarjeta);
          sacarPausa(tarjeta.querySelector('.play'));
     })
})

