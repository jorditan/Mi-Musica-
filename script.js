// init.addEventListener('click', () => {
//     sound.play();
// });

// pause.addEventListener('click', () => {
//     sound.pause();
// });

// CREAR CANCIONES PARA USAR EN EL DOM

const canciones = [
    {
        id: 1,
        autor: 'The Beatles',
        anio: 1964,
        img: 'https://static.independentespanol.com/s3fs-public/thumbnails/image/2019/09/17/17/the-beatles.jpg',
        audio: ['../Sound/X2Download.app - If I Fell (Remastered 2009) (128 kbps).mp3', '../Sound/X2Download.app - Im Happy Just To Dance With You (Remastered 2009) (128 kbps).mp3', '../Sound/X2Download.app - Helter Skelter (Remastered 2009) (128 kbps).mp3'],
    },
    {
        id: 2,
        autor: 'Sui Generis',
        audio: ['../Sound/y2mate.com - Sui Generis  Necesito Official Audio.mp3', '../Sound/y2mate.com - Cuando Te Vayas.mp3', '../Sound/y2mate.com - Sui Generis  El fantasma de Canterville.mp3'],
        anio: 1972,
    },
    {
        id: 3,
        autor: 'Van Halen',
        audio: ['../Sound/y2mate.com - Oh Pretty Woman 2015 Remaster.mp3', '../Sound/y2mate.com - Panama.mp3', '../Sound/y2mate.com - Romeo Delight 2015 Remaster.mp3'],
        anio: 1984,
    },
    {
        id: 4,
        autor: 'Radiohead',
        audio: ['../Sound/', '../Sound/y2mate.com - Panama.mp3', '../Sound/y2mate.com - Romeo Delight 2015 Remaster.mp3'],
        anio: 1991,
    }
]

//Elegir cancion aleatoria de cada década

const cancionesDecadas= canciones.map(({audio})=> audio);
const cancionesDecadas60s = cancionesDecadas[0];
const cancionesDecadas70s = cancionesDecadas[1];
const cancionesDecadas80s = cancionesDecadas[2];
const cancionesDecadas90s = cancionesDecadas[3];

function generarDatoRandom(cancionesDecadas60s) {
    const indiceAleatorio = Math.random();
    const indiceElegido = Math.floor(indiceAleatorio * cancionesDecadas60s.length)

    return cancionesDecadas60s[indiceElegido];
}

const datoRandom = generarDatoRandom(cancionesDecadas60s);
console.log(datoRandom);
let sound = new Audio (datoRandom)

const playToogleButtons = document.querySelectorAll('.playToogle');
console.log(playToogleButtons)
let estaSonando = false;


playToogleButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function() {
        reproducirCancion(this);
    });
});

function reproducirCancion(button) {
    const icon = button.querySelector('i');
        if (estaSonando) {
            sound.pause();
            icon.classList.remove('fa-pause')
            icon.classList.add('fa-play')
        }
        else {
            sound.play();
            icon.classList.remove('fa-play')
            icon.classList.add('fa-pause')
        }
        estaSonando = !estaSonando;
    }



// CAPTURAR ELEMENTOS DEL DOM PARA PODER APLICAR LAS CANCIONES

// CARGAR CANCIONES Y MOSTRARLA EN LA TARJETA

