import { bandas60 } from './sesentas.js';
import { bandas70 } from './setentas.js';
import { bandas80 } from './ochentas.js';
import { bandas90 } from './noventas.js';
import { ponerYSacarPausa, sacarPausa, reproducirCancionAleatoria, cambiarBandaSiHaceFalta }
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

     playButton.classList.add('fa-solid', 'fa-play', 'play');
     nextButton.classList.add('fa-solid', 'fa-forward');
     botones.classList.add('botones');
     imagen.classList.add('imagen');
     nombreBanda.classList.add('nombreBanda');
     nombreCancion.classList.add('nombreCancion');
     contenedorImagen.classList.add('contenedorImagen');
     infoTarjeta.classList.add('infoTarjeta');
     tarjeta.classList.add('tarjeta');

     tarjeta.setAttribute('id', `${contadorTarjetas}`);
     playButton.setAttribute('id', `${contadorTarjetas}`);
     tarjeta.appendChild(contenedorImagen);
     tarjeta.appendChild(infoTarjeta);
     infoTarjeta.appendChild(nombreBanda);
     infoTarjeta.appendChild(nombreCancion);
     infoTarjeta.appendChild(botones);
     botones.appendChild(playButton);
     botones.appendChild(nextButton);
     contenedorTarjetas.appendChild(tarjeta);
     nombreBanda.textContent = banda.nombre;
     nombreCancion.textContent = 'Toca para reproducir...'
})

const playToogleButtons = document.querySelectorAll('.play');
const nextButtons = document.querySelectorAll('.fa-forward');
let id =  [];

playToogleButtons.forEach(playButton => {
     playButton.addEventListener('click', function () {
          let tarjeta = playButton.closest('.tarjeta');
          let idBoton = parseInt(playButton.getAttribute('id'));
          id.push(idBoton);
          let bandaSeleccionada = bandasRock.find(banda => banda.id === idBoton);
          console.log(bandaSeleccionada);
          let cancionesBanda = bandaSeleccionada.audio;

          /*
               Selecciono la tarjeta, el ID y las canciones de la banda
               correspondiente a la tarjeta clickeada
          */

          ponerYSacarPausa(playButton);
          cambiarBandaSiHaceFalta(id, idBoton, cancionesBanda, tarjeta);
     })
})


nextButtons.forEach(nextButton => {
     nextButton.addEventListener('click', function () {
          let tarjeta = nextButton.closest('.tarjeta');
          let idBoton = parseInt(tarjeta.querySelector('.play').getAttribute('id'));
          id.push(idBoton);
          let bandaSeleccionada = bandasRock.find(banda => banda.id === idBoton);
          console.log(bandaSeleccionada);
          let cancionesBanda = bandaSeleccionada.audio;
     
          /*
               Selecciono la tarjeta, el ID y las canciones de la banda
               correspondiente a la tarjeta clickeada
          */

          reproducirCancionAleatoria(cancionesBanda, tarjeta);
          sacarPausa(tarjeta.querySelector('.play'));
     })
})

