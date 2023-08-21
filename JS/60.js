// Animacion aparición de tarjetas al scrollear

const animado = document.querySelectorAll('.animado');

function mostrarScroll() {
    let scrollTop = document.documentElement.scrollTop;

    for (i = 0; i < animado.length; i++) {
        let alturaAnimado = animado[i].offsetTop;
        if (alturaAnimado - 400 < scrollTop) {
            animado[i].style.opacity = 1;
        }
    }
}

window.addEventListener('scroll', mostrarScroll);


// Determino los valores de las tarjetas

const bandas = [
    {
        nombre: 'The Beatles',
        audio: ['../Sound/If I Fell.mp3', '../Sound/Im Happy Just To Dance With You.mp3', '../Sound/Helter Skelter.mp3', '../Sound/Help!.mp3', '../Sound/Across The Universe.mp3'],
        genero: 'Rock',
        id: 1,
    },
    {
        nombre: 'The Doors',
        audio: ['../Sound/LA Woman.mp3', '../Sound/Roadhouse Blues.mp3', '../Sound/Love Her Madly.mp3'],
        genero: 'Rock',
        id: 2
    },
    {
        nombre: 'Led Zeppelin',
        audio: ['../Sound/Baby Come on Home.mp3', '../Sound/Black Dog.mp3', '../Sound/Whole Lotta Love.mp3', '../Sound/All My Love.mp3'],
        genero: 'Rock',
        id: 3
    },
    {
        nombre: 'Pink Floyd',
        audio: ['../Sound/Mother.mp3', '../Sound/High Hopes.mp3','../Sound/Fearless.mp3'],
        genero: 'Rock',
        id: 4
    },
    {
        nombre: 'Vox Dei',
        audio: ['../Sound/Ritmo y Blues con Armónica.mp3', '../Sound/Presente.mp3', '../Sound/Profecías.mp3'],
        genero: 'Rock',
        id: 5
    },
    {
        nombre: 'The Rolling Stones',
        audio: ['../Sound/Gimme Shelter.mp3', '../Sound/Wild Horses.mp3','../Sound/Fool To Cry.mp3'],
        genero: 'Rock',
        id: 6
    },
]

// Selecciono los botones de reproduccion, like y nombre de cancion

const playToogleButtons = document.querySelectorAll('.playToogle');
const nextButtons = document.querySelectorAll('.next');
const like = document.querySelectorAll('.ui-like');
const nombre = document.querySelectorAll('.nombreCancion');

let estaSonando = false;
let sound = new Audio();

// Destructuro el array de objetos para obtener las canciones de todas las bandas

const cancionesBandas = bandas.map(({audio}) => audio);

// Selecciono los botones y les doy las funciones necesarias

playToogleButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function() {;
    const tarjeta = elemento.closest('.tarjeta');
    const idBoton = parseInt(elemento.getAttribute('id'));
    const bandaSeleccionada = bandas.find(banda => banda.id === idBoton);
    const cancionesBanda = bandaSeleccionada.audio;

    ponerYSacarPausa(this);
    cambiarBandaSiHaceFalta(idBoton, cancionesBanda);
    imprimirNombreCancion(tarjeta);
    });
});

nextButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function () {
        const tarjeta = elemento.closest('.tarjeta');
        const idBoton = parseInt(tarjeta.querySelector('.playToogle').getAttribute('id'));
        const bandaSeleccionada = bandas.find(banda => banda.id === idBoton);
        const cancionesBanda = bandaSeleccionada.audio;

        reproducirCancionAleatoria(cancionesBanda);
        sacarPausa(this);
    })
})

function cambiarBandaSiHaceFalta (idBoton, cancionesBanda) { // Funcion para cambiar los temas de la banda al hacer click en otra tarjeta
    let idViejo = window.idViejo;
    window.idViejo = idBoton;

    if (idViejo != idBoton) {
        reproducirCancionAleatoria(cancionesBanda);
    }
}


function ponerYSacarPausa(button) { // Funcion para pausar y reproducir canción
    const icon = button.querySelector('i');
    if (sound.paused) {
            sound.play();
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            }
    else {
        sound.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

function reproducirCancionAleatoria(canciones) { // Funcion para reproducir la cancion aleatoria
    const cancionActual = generarDatoRandom(canciones);
    obtenerNombreCancion(cancionActual);

    sound.src = cancionActual;
    sound.play();
    estaSonando = true;
}

function generarDatoRandom(canciones) { // Generar canción aleatoria 
    indice = Math.floor(Math.random() * canciones.length);
    const cancionAleatoria = canciones[indice];
    return cancionAleatoria;
}

function obtenerNombreCancion(cancionActual) { // Obtiene el nombre de la canción que se reproduce 
    const nombreCancionActual = cancionActual.split('/').pop().split('.')[0];
    console.log(nombreCancionActual);
    return nombreCancionActual;
}

function imprimirNombreCancion(tarjeta, nombreCancionActual) {
    const elementoNombre = tarjeta.querySelector('.nombreCancion');
    elementoNombre.innerHTML = nombreCancionActual;
}


function sacarPausa(boton) { //Saca la pausa
    const botonTarjeta = boton.closest('.tarjeta').querySelector('.playToogle');
    botonTarjeta.querySelector('i').classList.remove('fa-play');
    botonTarjeta.querySelector('i').classList.add('fa-pause');
}


// Chequear que el like esté clickeado


// Guardar la tarjeta faveada entera en el local storage
