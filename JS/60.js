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

// Selecciono los botones de reproduccion y de like

const playToogleButtons = document.querySelectorAll('.playToogle');
const nextButtons = document.querySelectorAll('.next');
const like = document.querySelectorAll('.ui-like');

let estaSonando = false;
let sound = new Audio();

// Destructuro el array de objetos para obtener las canciones de todas las bandas

const cancionesBandas = bandas.map(({audio}) => audio);
console.log(cancionesBandas);

// Selecciono los botones y les doy las funciones necesarias

playToogleButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function() {
    const idBoton = parseInt(elemento.getAttribute('id'));
    const cancionesBanda = bandas.find(banda => banda.id === idBoton).audio;
    console.log(cancionesBanda);
    pausarCancion(this);
    reproducirCancionSiHacecFalta(this);
    });
});

nextButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function () {
        reproducirCancionAleatoria(this);
        sacarPausa(this);
    })
})

// Generar canción aleatoria 

function generarDatoRandom(cancionesBandas) {;
    const cancionAleatoria = cancionesBandas[Math.floor(Math.random() * cancionesBandas.length)];
    console.log(cancionAleatoria);
    return cancionAleatoria;
}

// Funcion para pausar la cancion

function pausarCancion(button) {
    const icon = button.querySelector('i');
    if (sound.paused || sound.onchange) {
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

// Funcion para reproducir una cancion aleatoria

function reproducirCancionAleatoria() {
        const cancionActual = generarDatoRandom(cancionesBandas);
        sound.src = cancionActual;
        sound.play();
}

function sacarPausa(boton) {
    const botonTarjeta = boton.closest('.tarjeta').querySelector('.playToogle');
    botonTarjeta.querySelector('i').classList.remove('fa-play');
    botonTarjeta.querySelector('i').classList.add('fa-pause');
}

function reproducirCancionSiHacecFalta(cancionesBanda) {
    if (sound.src === '') {
        reproducirCancionAleatoria(cancionesBanda);
    }
}










