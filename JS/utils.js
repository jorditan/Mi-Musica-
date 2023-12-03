function obtenerCancioncesBandas(bandas) {
     const cancionesBandas = bandas.map(({ audio }) => audio);
     return cancionesBandas
}

let estaSonando = false;
const cancionesReproducidas = [];

const sound = new Audio()

function ponerYSacarPausa(elemento) {
     /*
          Esta funcion se encarga da sacar y poner la pausa. Además, en caso de que el audio 
          es nulo, se encarga de reproducir una canción.
     */
     const icono = elemento.querySelector('i');

     if (sound.src === '') {
          sacarPausa(icono);
     }
     else if (sound.paused) {
          sound.play();
          sacarPausa(icono)
     }
     else {
          sound.pause();
          sacarPlay(icono);
     }
}

const sacarPausa = (icono) => {
     /*
          Esta funcion se encarga de sacar el play y poner la pausa.
     */
     icono.classList.remove('fa-play');
     icono.classList.add('fa-pause');
}

const sacarPlay = (icono) => {
     /*
          Esta función se encarga de sacar la pausa y poner el play.
     */
     icono.classList.remove('fa-pause');
     icono.classList.add('fa-play');
}

function cambiarBandaSiHaceFalta(id, idBoton, cancionesBanda, tarjeta) {
     /*
          Esta función se ejecuta en caso de clickear en una tarjeta distinta a la
          que se estaba reproduciendo previamente, cambiando  a las canciones
          de la nueva banda
     */
     let idViejo = id[id.length - 2];
     if (idViejo !== idBoton || sound.src == '') {
          reproducirCancionAleatoria(cancionesBanda, tarjeta);
     }
}

function reproducirCancionAleatoria(cancionesBanda, tarjeta) {
     /*
          Esta funcion genera una cancion aleatoria y recibe su nombre, luego
          invoca otra funcion para imprimir su nombre.
     */
     let cancionActual = generarDatoRandom(cancionesBanda);

     while (cancionesReproducidas[cancionesReproducidas.length - 1] == cancionActual) {
          cancionActual = generarDatoRandom(cancionesBanda);
     }

     cancionesReproducidas.push(cancionActual);
     let nombreCancionActual = cancionActual.split('/').pop().split('.')[0];
     sound.src = cancionActual;
     imprimirNombreCancion(nombreCancionActual, tarjeta);
     sound.play();
}


function generarDatoRandom(canciones) { // Generar canción aleatoria 
     let indice = Math.floor(Math.random() * canciones.length);
     const cancionAleatoria = canciones[indice];

     return cancionAleatoria;
}

function imprimirNombreCancion(nombreCancion, tarjeta) { //Imprime el nombre de la canción
     const elementoNombre = tarjeta.querySelector('.nombreCancion');
     elementoNombre.innerHTML = nombreCancion;
}


export {
     obtenerCancioncesBandas, imprimirNombreCancion, generarDatoRandom, reproducirCancionAleatoria,
     cambiarBandaSiHaceFalta, ponerYSacarPausa, sacarPausa, sacarPlay, sound
}