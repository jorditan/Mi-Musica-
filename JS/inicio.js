// CREAR CANCIONES PARA USAR EN EL DOM

const canciones = [
    {
        id: 1,
        autor: 'The Beatles',
        anio: 1964,
        img: 'https://static.independentespanol.com/s3fs-public/thumbnails/image/2019/09/17/17/the-beatles.jpg',
        audio: ['../Sound/If I Fell.mp3', '../Sound/Im Happy Just To Dance With You.mp3', '../Sound/Helter Skelter.mp3'],
    },
    {
        id: 2,
        autor: 'Sui Generis',
        audio: ['../Sound/Necesito.mp3', '../Sound/Cuando Te Vayas.mp3', '../Sound/El fantasma de Canterville.mp3'],
        anio: 1972,
    },
    {
        id: 3,
        autor: 'Van Halen',
        audio: ['../Sound/Oh Pretty Woman.mp3', '../Sound/Panama.mp3', '../Sound/Romeo Delight.mp3'],
        anio: 1984,
    },
    {
        id: 4,
        autor: 'Radiohead',
        audio: ['../Sound/You.mp3', '../Sound/Paranoid Android.mp3', '../Sound/High and Dry HQ.mp3'],
        anio: 1991,
    }
]

//Elegir cancion aleatoria de cada década
const playToogleButtons = document.querySelectorAll('.playToogle');
const nextButtons = document.querySelectorAll('.next');

let estaSonando = false;

const cancionesDecadas = canciones.map(({audio})=> audio);
const cancionesDecadas60s = cancionesDecadas[0];
const cancionesDecadas70s = cancionesDecadas[1];
const cancionesDecadas80s = cancionesDecadas[2];
const cancionesDecadas90s = cancionesDecadas[3];

let sound = new Audio();
let cancionActual;

function generarDatoRandom(cancionesDecadas) {
    const indiceAleatorio = Math.floor(Math.random() * cancionesDecadas.length);
    return cancionesDecadas[indiceAleatorio];
}

// Agregar eventos a los botones

playToogleButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function() {
        reproducirCancionSiHaceFalta(this);
        pausarCancion (this);
    });
});

nextButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function() {
        reproducirOtraCancion(this);
    });
});


function reproducirOtraCancion(boton) {
    estaSonando = true;
    let cancionesDecada;
    const decada = boton.closest('.next').getAttribute('id');

    // CAMBIAR CANCION DEPENDIENDO DE DÉCADA

    switch (decada) {
        case '60s':
        cancionesDecada = cancionesDecadas60s;
        break;
        case '70s':
        cancionesDecada = cancionesDecadas70s;
        break;
        case '80s':
        cancionesDecada = cancionesDecadas80s;
        break;
        case '90s':
        cancionesDecada = cancionesDecadas90s;
        break;
        default:
        return;
    }

    const datoRandom = generarDatoRandom(cancionesDecada, decada);
    cancionActual = datoRandom;

    sound.src = cancionActual; // Cambiar la fuente del audio
    sound.play();

    const botonTarjeta = boton.closest('.tarjeta').querySelector('.playToogle');

    // Cambiar el icono del botón
    botonTarjeta.querySelector('i').classList.remove('fa-play');
    botonTarjeta.querySelector('i').classList.add('fa-pause');
}


// Funcion para pausar la cancion que se esté reproduciendo

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

// Al hacer click el boton de play se reproduce una cancion correspondiente de la década

function reproducirCancionSiHaceFalta(boton) {
    const tarjeta = boton.closest('.tarjeta');
    const icon = boton.querySelector('i');
    const decada = tarjeta.querySelector('.next').getAttribute('id');
    let decadaVieja = window.decadaVieja;

    let cancionesDecada;

    switch (decada) {
        case '60s':
        cancionesDecada = cancionesDecadas60s;
        break;
        case '70s':
        cancionesDecada = cancionesDecadas70s;
        break;
        case '80s':
        cancionesDecada = cancionesDecadas80s;
        break;
        case '90s':
        cancionesDecada = cancionesDecadas90s;
        break;
        default:
        return;
    }

    if (sound.src == '' || decada !== decadaVieja) {
        const nuevaCancion = generarDatoRandom(cancionesDecada, decada);
        console.log(nuevaCancion);
        sound.src = nuevaCancion;
        sound.play;
    }

    window.decadaVieja = decada
}

