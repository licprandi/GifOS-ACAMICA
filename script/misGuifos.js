// ----- CARGAR TEMA Y CARGAR MIS GIF -----

window.addEventListener('DOMContentLoaded', () => {
    let rutaTema = localStorage.getItem("temaClaro");
    temaClaro.setAttribute("href", rutaTema);
    crearImagenMisGuifos();
});

// ----- BOTONES PRINCIPALES -----
const buttonCrear = document.querySelector('.item-crear');


buttonCrear.addEventListener('click', () => {
  window.location.assign('./crearGuifos.html');
});

// ----- CREAR DIV PARA MIS GIF DESDE LOCALSTORAGE -----
let crearMiGifContenedor = document.querySelector('#mis-gifs');

function crearImagenMisGuifos() {
    let crearDivContenedor = document.createElement('div');
    crearMiGifContenedor.appendChild(crearDivContenedor).setAttribute('class', 'mis');
    
    Object.keys(localStorage).forEach((key) => {
        if (key != 'temaClaro') {
            let crearDivImg = document.createElement('div');
            crearDivContenedor.appendChild(crearDivImg).setAttribute('class', 'div2');
            let botonBorrar = document.createElement('img')
            crearDivImg.appendChild(botonBorrar).setAttribute('src', './images/button_close.svg');
            botonBorrar.setAttribute('class', 'boton-cerrar');
            let crearImg = document.createElement('img');
            crearDivImg.appendChild(crearImg).setAttribute('class', 'miss');
            crearImg.src = `https://media.giphy.com/media/${localStorage.getItem(key)}/giphy.gif`;
        
            botonBorrar.addEventListener('click', () => {
                if (confirm('Está seguro que desea eliminar el Gif?')){
                    crearDivContenedor.removeChild(crearDivImg);
                    localStorage.removeItem(key);
                };
            })
        }
    })
}


const buttonElegir = document.querySelector('.elegir');
const buttonFlecha = document.querySelector('.flecha');

buttonElegir.addEventListener("click", () => {
  document.getElementById("menu_temas").classList.toggle("show");
});
buttonFlecha.addEventListener("click", () => {
  document.getElementById("menu_temas").classList.toggle("show");
});


//-----SACAR MENU DE TEMAS UNA VEZ QUE HACE CLICK EN TEMA O AFUERA------

window.onclick = function (event) {
  if (!event.target.matches('.elegir, .flecha')) {
    let desplegables = document.getElementsByClassName("item-elegir-temas");
    let i;
    for (i = 0; i < desplegables.length; i++) {
      let desplegarMenu = desplegables[i];
      if (desplegarMenu.classList.contains('show')) {
        desplegarMenu.classList.remove('show');
      }
    }
  }
}

// ----- CAMBIAR CSS PARA DIFERENTES TEMAS------
let temaClaro = document.querySelector("#tema-claro");

const buttonDay = document.querySelector(".day");
const buttonNight = document.querySelector(".night");

buttonDay.addEventListener("click", () => {
  temaClaro.setAttribute("href", "./styles/dayTheme.css");
  localStorage.setItem("temaClaro", "./styles/dayTheme.css");
});

buttonNight.addEventListener("click", () => {
  temaClaro.setAttribute("href", "./styles/nightTheme.css");
  localStorage.setItem("temaClaro", "./styles/nightTheme.css");
});