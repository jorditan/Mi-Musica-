import  {obtenerCancioncesBandas,  ponerYSacarPausa, sacarPausa,
    reproducirCancionAleatoria, cambiarBandaSiHaceFalta, sound
    }
    from './utils.js';
    
    import { mostrarScroll, favearTarjeta, guardarTarjetaStorage} 
    from './sesentas.js';

window.addEventListener('scroll', mostrarScroll);

const bandas80 = [
    {
        id: 1,
        nombre: 'Van Halen',
        audio: ['../Sound/Oh Pretty Woman.mp3', '../Sound/Panama.mp3', '../Sound/Romeo Delight.mp3'],
        genero: 'Rock',
        img: 'https://static01.nyt.com/images/2020/10/07/arts/07evh-appraisal/07evh-appraisal0-mediumSquareAt3X.jpg'
    },
    {
        id: 2,
        nombre: 'Quiet Riot',
        audio: ['../Sound/Twilight Hotel.mp3', '../Sound/Mama Weer All Creazy now.mp3', '../Sound/Cum On Feel The Noise.mp3'],
        genero: 'Rock',
        img: 'https://www.rockaxis.com/img/newsList/6793198.jpg'
    },
    {
        id: 3,
        nombre: 'Guns N Roses',
        audio: ['../Sound/Welcome to the Jungle.mp3', '../Sound/Patience.mp3', '../Sound/Nightrain.mp3'],
        genero: 'Rock',
        img: 'https://d3iln1l77n73l7.cloudfront.net/couch_images/attachments/000/054/785/original/guns_and_roses_320x320.jpg?2014'
    },
    {
        id: 4,
        nombre: 'Soda Stereo',
        audio: ['../Sound/Te Hacen Falta Vitaminas.mp3', '../Sound/Nada Personal.mp3', '../Sound/Juego de Seduccion.mp3'],
        genero: 'Pop',
        img: '"https://ca-times.brightspotcdn.com/dims4/default/2a3e235/2147483647/strip/true/crop/1026x1334+0+0/resize/2000x2600!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fe2%2F71%2Fd1cce0b6445eb40e560b06ddaf1e%2Fla-rompen-en-espanol-1251896.JPG'
    },
    {
        id: 5,
        nombre: 'Virus',
        audio: ['../Sound/Pronta Entrega.mp3', '../Sound/Imágenes Paganas.mp3', '../Sound/Luna de Miel en la mano.mp3'],
        genero: 'Pop',
        img: 'https://www.lanacion.com.py/resizer/DkbXSN8B-5fKHLQc4bg6lXBXgPA=/1016x0/smart/filters:format(jpg):quality(70)/arc-anglerfish-arc2-prod-lanacionpy.s3.amazonaws.com/public/PRT5HSG5QRDQDFYQ2FKXSHSB5M'
    },
    {
        id: 6,
        nombre: 'Metallica',
        audio: ['../Sound/One.mp3', '../Sound/Whiskey In The Jar.mp3', '../Sound/Battery.mp3'],
        genero: 'Rock',
        img: 'https://www.infobae.com/new-resizer/XN1pVxJakOOtUUsiVWZma0BvgwU=/arc-anglerfish-arc2-prod-infobae/public/MRZVAJQE5ZA33LP5ZWJIJLZPV4.jpg'
    },
]


const id = []
const playToogleButtons = document.querySelectorAll('.playToogle3')
const nextButtons = document.querySelectorAll('.next3')
const nombre = document.querySelectorAll('.nombreCancion');

playToogleButtons.forEach(function(elemento) {
    elemento.addEventListener('click', function() {;
        let tarjeta = elemento.closest('.tarjeta');
        let idBoton = parseInt(elemento.getAttribute('id'));
        id.push(idBoton);
        let bandaSeleccionada = bandas80.find(banda => banda.id === idBoton);
        let cancionesBanda = bandaSeleccionada.audio;
        
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
        let idBoton = parseInt(tarjeta.querySelector('.playToogle3').getAttribute('id'));
        id.push(idBoton);
        let bandaSeleccionada = bandas80.find(banda => banda.id === idBoton);
        let cancionesBanda = bandaSeleccionada.audio;
        /*
            Selecciono la tarjeta, el ID y las canciones de la banda
            correspondiente a la tarjeta clickeada
        */
        
        reproducirCancionAleatoria(cancionesBanda, tarjeta);
        sacarPausa(tarjeta.querySelector('.play'));
    })
})

// FUNCIONALIDAD LIKES PARA EL LOCAL STORAGE //

const likes = document.querySelectorAll('.like-2');
let datosTarjetasFaveadas = [];
let estaClickeado = false;


likes.forEach(function(like) {
    like.addEventListener('click', function() {
        let tarjeta = like.closest('.tarjeta');
        let datos = {
            nombre: tarjeta.querySelector('.nombreBanda').innerHTML,
            id: tarjeta.getAttribute('id'),
            img: tarjeta.querySelector('.imagen').getAttribute('src'),
        }

        favearTarjeta(tarjeta, datos);
        guardarTarjetaStorage(datosTarjetasFaveadas);
        console.log(datosTarjetasFaveadas)
    })
})

export {bandas80}