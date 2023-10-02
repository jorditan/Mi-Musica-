import  {obtenerFavoritos, favearTarjeta, tieneDuplicados, datosTarjetasFaveadas, estaClickeado, estaSonando,
    imprimirNombreCancion, cambiarBandaSiHaceFalta, sacarPausa, sacarPlay, generarDatoRandom, cancionesBandas, reproducirCancionAleatoria,
    guardarTarjetaStorage,}
from './decadas.js';

const likes = document.querySelectorAll('.like');

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
    })
})

