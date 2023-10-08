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
        audio: ['../Sound/Baby Come On Home.mp3', '../Sound/Black Dog.mp3', '../Sound/Whole Lotta Love.mp3', '../Sound/All My Love.mp3'],
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
const nombre = document.querySelectorAll('.nombreCancion');

let estaSonando = false;
let sound = new Audio();
let id = [];

// Destructuro el array de objetos para obtener las canciones de todas las bandas
const cancionesBandas = bandas.map(({audio}) => audio);


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

function ponerYSacarPausa(button, cancionesBanda, tarjeta) { 
    /*
        Esta funcion se encarga da sacar y poner la pausa. Además, en caso de que el audio 
        es nulo, se encarga de reproducir una canción.
    */
    const icono = button.querySelector('i');
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
    let idViejo = id[id.length -2];
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
    let nombreCancionActual = cancionActual.split('/').pop().split('.')[0];
    imprimirNombreCancion(nombreCancionActual, tarjeta);
    sound.src = cancionActual;
    sound.play();
    estaSonando = true;
}

function generarDatoRandom(canciones) { // Generar canción aleatoria 
    indice = Math.floor(Math.random() * canciones.length);
    const cancionAleatoria = canciones[indice];

    return cancionAleatoria;
}
function imprimirNombreCancion(nombreCancion, tarjeta) { //Imprime el nombre de la canción
    const elementoNombre = tarjeta.querySelector('.nombreCancion');
    elementoNombre.innerHTML = nombreCancion;
}


// ----------------------------------------------------------------------------------

/*
    Esta seccion del código se encargar de desarrollar
    una manera de guardar en el local storage las tarjetas con like
*/

const likes = document.querySelectorAll('.like');
const tarjetas = document.querySelectorAll('.tarjeta');
let datosTarjetasFaveadas = [];
let estaClickeado = false;

likes.forEach(function(like) {
    /*
        Arego evento de like, seleccionando la tarjeta y sus datos 
        correspondientes.
    */
    like.addEventListener('click', () => {
        let tarjeta = like.closest('.tarjeta');
        let datos = {
            nombre: tarjeta.querySelector('.nombreBanda').innerHTML,
            id: tarjeta.getAttribute('id'),
            url: './HTML/60s.html',
            img: tarjeta.querySelector('.imagen').getAttribute('src'),
        }

        favearTarjeta(tarjeta, datos);
        guardarTarjetaStorage(datosTarjetasFaveadas);
        console.log(datosTarjetasFaveadas)
    })
})

function favearTarjeta (tarjeta, datos) {
/*
    Esta funcion se encarga de favear la tarjeta
*/
    let id = datos.id;

    if (tieneDuplicados(datosTarjetasFaveadas, id)) {
        // Si la tarjeta ya está en tarjetasFaveadas, la sacamos.
        estaClickeado = false;
        datosTarjetasFaveadas = datosTarjetasFaveadas.filter(item => item.id !== id);
    } else {
        // Si la tarjeta no está en tarjetasFaveadas, la agregamos.
        estaClickeado = true;
        datosTarjetasFaveadas.push(datos);
    }
}

function tieneDuplicados(array, id) {
    return array.some(item => item.id === id);
}

function guardarTarjetaStorage(datosTarjetasFaveadas) {
    localStorage.setItem('localTarjeta', JSON.stringify(datosTarjetasFaveadas));
}

function obtenerFavoritos() {
    let guardadoStorage = localStorage.getItem('localTarjeta');
    if (guardadoStorage == null) {
        datosTarjetasFaveadas = [];
    }
    else {
        datosTarjetasFaveadasarjetasFaveadas = JSON.parse(guardadoStorage);
    }
    return datosTarjetasFaveadas()
}