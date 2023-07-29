const nav = document.querySelector('.navbar');
const abrir = document.getElementById('abrir');
const cerrar = document.getElementById('cerrar');
const imagen = document.getElementById('imagen');

console.log(abrir, cerrar);

abrir.addEventListener('click', () => {
	nav.classList.add("visible");
    cerrar.style.display = 'block';
    imagen.style.display = 'none';
})

cerrar.addEventListener('click', ()=> {
    nav.classList.remove('visible');
    imagen.style.display = 'flex';
})

