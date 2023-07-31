const nav = document.querySelector('.navbar');
const abrir = document.getElementById('abrir');
const cerrar = document.getElementById('cerrar');
const imagen = document.getElementById('imagen');
const botonGeneros = document.getElementById('boton-generos');
const botonDecadas = document.getElementById('boton-decadas');
const dropdownGeneros = document.querySelector('.dropdown-generos')
const dropdownDecadas = document.querySelector('.dropdown-decadas')


abrir.addEventListener('click', () => {
	nav.classList.add("visible");
    cerrar.style.display = 'block';
    imagen.style.display = 'none';
})

cerrar.addEventListener('click', ()=> {
    nav.classList.remove('visible');
    imagen.style.display = 'flex';
})

botonGeneros.addEventListener('click', () => {
    const caret = botonGeneros.querySelector('.fa-solid.fa-caret-up');
    dropdownGeneros.style.opacity = dropdownGeneros.style.opacity === '1' ? '0' : '1';
    dropdownGeneros.style.visibility = dropdownGeneros.style.opacity === '1' ? 'visible' : 'hidden';
    caret.classList.toggle('fa-caret-down');
});

botonDecadas.addEventListener('click', () => {
    const caret = botonDecadas.querySelector('.fa-solid.fa-caret-up');
    dropdownDecadas.style.opacity = dropdownDecadas.style.opacity === '1' ? '0': '1';
    dropdownDecadas.style.visibility = dropdownDecadas.style.opacity === '1' ? 'visible' : 'hidden';
    caret.classList.toggle('fa-caret-down');
    
});




