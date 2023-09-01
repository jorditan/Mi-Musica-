const nav = document.querySelector('.navbar');
const abrir = document.getElementById('abrir');
const cerrar = document.getElementById('cerrar');
const botonGeneros = document.getElementById('boton-generos');
const botonDecadas = document.getElementById('boton-decadas');
const dropdownGeneros = document.querySelector('.dropdown-generos')
const dropdownDecadas = document.querySelector('.dropdown-decadas')
const decadas = document.querySelector('.contenedorDecadas');
const generos = document.querySelector('.contenedorGeneros');


abrir.addEventListener('click', () => {
	nav.classList.add("visible");
    cerrar.style.display = 'block';
});

cerrar.addEventListener('click', ()=> {
    nav.classList.remove('visible');
    cerrar.style.display = 'none';
});

botonGeneros.addEventListener('click', () => {
    const caret = generos.querySelector('.fa-solid.fa-caret-up');
    dropdownGeneros.style.display = dropdownGeneros.style.display === 'block' ? 'none' : 'block';
    caret.classList.toggle('fa-caret-down');
});

botonDecadas.addEventListener('click', () => {
    const caret = decadas.querySelector('.fa-solid.fa-caret-up');
    dropdownDecadas.style.display = dropdownDecadas.style.display === 'block' ? 'none' : 'block';
    caret.classList.toggle('fa-caret-down');
});




