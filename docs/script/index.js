// ----- CARGAR TEMA ------

window.addEventListener('DOMContentLoaded', () => {
  let rutaTema = localStorage.getItem("temaClaro");
  temaClaro.setAttribute("href", rutaTema);
});


// ----- DESPLEGAR MENU DE TEMAS ------
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
  lupaInactiva();

});

buttonNight.addEventListener("click", () => {
  temaClaro.setAttribute("href", "./styles/nightTheme.css");
  localStorage.setItem("temaClaro", "./styles/nightTheme.css");
  lupaInactiva();
});


// ----- VARIABLES -----
const apiKey = 'WU9WhGNxqjCYCPj1hrrQBhrgcs6cKB2G';
const buttonCrear = document.querySelector('.item-crear');
const buttonMisGuifos = document.querySelector('.mis-gifos');
const buttonBuscar = document.querySelector('.buscar-boton');
const buttonInput = document.querySelector('.input button');
const campoInput = document.querySelector('.input .campo-input');
const resultadoSugerencias = document.querySelector('.resultado-sugerencias');
const resultadoDisplay = document.querySelector('.contenedor-resultado-sugerencias');
const resultadoTags = document.querySelector('.contenedor-tags');
const buttonSug1 = document.querySelector('#sug1');
const tendenciasTitulo = document.querySelector('.tendenciasTitulo');
const sugerenciasDisplay = document.querySelector('.sugerencias');
const buttonVerMas = document.querySelectorAll('.boton-ver-mas');
const buttonCerrarGif = document.querySelectorAll('.sugerencias-imagen button');
const lupaBlanca = document.querySelector('.lupa-blanca');
const lupaNegra = document.querySelector('.lupa');
const lupaGrisClara = document.querySelector('.lupa-inactiva-light');
const lupaGrisOscura = document.querySelector('.lupa-inactiva-dark');
const dayImg = document.querySelector('#tema-claro');
const nightImg = document.querySelector('#tema-oscuro');


// ----- BOTONES PRINCIPALES -----
buttonCrear.addEventListener('click', () => {
  window.location.assign('./crearGuifos.html');
});

buttonMisGuifos.addEventListener('click', () => {
  window.location.assign('./misGuifos.html');
});

// ----- EJECUION DEL BOTON BUSQUEDA -----

campoInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13 && campoInput.value !== '') {
    busquedaGif();
    ocultar();
  }
});
buttonBuscar.addEventListener("click", () => {
  if (campoInput.value !== '') {
    busquedaGif();
    ocultar();
    lupaInactiva();
    buttonInput.className = 'buscar-boton';
  }
});
campoInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 27) {
    ocultar();
  }
});
function ocultar() {
  resultadoDisplay.style.display = 'none';
  campoInput.value = '';
}


// ----- CAMBIO DE COLORES BOTON BUSCAR / LUPAS ------
function lupaInactiva() {
  const temaActual = localStorage.getItem('temaClaro');
  if (temaActual === './styles/dayTheme.css') {
    lupaGrisClara.style.display = 'block';
    lupaGrisOscura.style.display = 'none';
    lupaNegra.style.display = 'none';
    lupaBlanca.style.display = 'none';
  } else {
    lupaGrisOscura.style.display = 'block';
    lupaGrisClara.style.display = 'none';
    lupaBlanca.style.display = 'none';
    lupaNegra.style.display = 'none';
  }
}

function lupaActiva() {
  const temaActual = localStorage.getItem('temaClaro');
  if (temaActual === './styles/dayTheme.css') {
    lupaBlanca.style.display = 'none';
    lupaNegra.style.display = 'block';
    lupaGrisOscura.style.display = 'none';
    lupaGrisClara.style.display = 'none';
  } else {
    lupaNegra.style.display = 'none';
    lupaBlanca.style.display = 'block';
    lupaGrisOscura.style.display = 'none';
    lupaGrisClara.style.display = 'none';
  }
}

// ----- AUTOCOMPLETE DE BUSQUEDA -----

campoInput.addEventListener('keyup', () => {
  if (campoInput.value === '') {
    lupaInactiva();
    buttonInput.className = 'buscar-boton'
    resultadoDisplay.style.display = 'none';

  } else {
    buttonInput.className = 'buscar-boton-color';
    resultadoDisplay.style.display = 'block';
    lupaActiva();
    const limite = 3;
    const URL_AUTOCOMPLETE = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${campoInput.value}&limit=${limite}`
    const buttonSugerencias = document.querySelectorAll('.boton-sugerencias');

    fetch(URL_AUTOCOMPLETE)
      .then(response => response.json())
      .then(elem => {

        const arrayResultados = elem.data;

        for (let i = 0; i < arrayResultados.length; i++) {
          buttonSugerencias[i].innerHTML = arrayResultados[i].name;
          buttonSugerencias[i].addEventListener('click', () => {
            campoInput.value = elem.data[i].name;
            setTimeout(function () {
              busquedaGif();
              ocultar();
              lupaInactiva();
              buttonInput.className = 'buscar-boton';
            }, 100)
          })
        }
      }).catch(err => console.log(err));
  };
});


// ----- RESULTADO DE LA BUSQUEDA DESDE LA API -----

let gifTendRecarga = document.querySelectorAll('.gif');
let tituloTend = document.querySelectorAll('.sub');
let buttonTag = document.querySelectorAll('.tag')

function busquedaGif() {
  let resultadoBusqueda = campoInput.value.toLowerCase().trim();

  for (let i = 0; i < 10; i++) {
    gifTendRecarga[i].setAttribute('src', './images/cargandogif.png');
  }

  sugerenciasDisplay.style.display = 'none';
  resultadoTags.style.display = 'block';
  campoInput.placeholder = 'Busca gifs, hashtags, temas, busca lo que quieras…';
  const limite = 10;
  const URL_BUSQUEDA = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${resultadoBusqueda}&limit=${limite}`;
  for (let i = 0; i < 10; i++) {
    fetch(URL_BUSQUEDA)
      .then(response => response.json())
      .then(elem => {

        const gifObject = elem.data;

        gifTendRecarga[i].setAttribute("src", gifObject[i].images.fixed_height.url);
        tituloTend[i].innerHTML = `#${gifObject[i].title.substring(0, 30)}`;
        tendenciasTitulo.innerHTML = `Resultado de la Búsqueda: "${resultadoBusqueda}"`;
        buttonTag[i].innerHTML = `#${gifObject[i].title.substring(0, 15)}`;

        buttonTag[i].addEventListener('click', () => {
          campoInput.value = gifObject[i].title;
          setTimeout(function () {
            busquedaGif();
            campoInput.value = '';
          }, 100)
        })

      }).catch(err => console.log(err));
  };
}


// ----- FETCH PARA TRAER GIF SUGERENCIAS -----

let imagenSug = document.querySelectorAll(".giffy");
let tituloSug = document.querySelectorAll(".sgif");
const closeImg = document.querySelectorAll('.sugerencias-imagen img');

const URL_RANDOM = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=reactions&rating=G`
const URL_TRENDING = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=25`


for (let i = 0; i < 4; i++) {

  fetch(URL_RANDOM)
    .then((response) => response.json())
    .then((elem) => {
      const gifObject = elem.data;

      imagenSug[i].setAttribute("src", gifObject.images.fixed_height.url);
      tituloSug[i].innerHTML = `#${gifObject.title.substring(0, 30)}`;

      buttonVerMas[i].addEventListener('click', () => {
        campoInput.value = gifObject.title;
        busquedaGif()
        campoInput.value = '';
      })

    }).catch((err) => console.log(err));
}


// ----- FETCH PARA TRAER GIF TENDENCIAS -----

for (let i = 0; i < 10; i++) {
 
  fetch(URL_TRENDING)
    .then(response => response.json())
    .then(elem => {
      const gifObject = elem.data;

      gifTendRecarga[i].setAttribute("src", gifObject[i].images.fixed_height.url);
      tituloTend[i].innerHTML = `#${gifObject[i].title.substring(0, 30)};`

    }).catch((err) => console.log(err));
}
