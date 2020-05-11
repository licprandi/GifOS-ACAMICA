
let temaClaro = document.querySelector("#tema-claro");

window.addEventListener('DOMContentLoaded', () => {
  let rutaTema = localStorage.getItem("temaClaro");
  temaClaro.setAttribute("href", rutaTema);
});


// ----- CONSTANTES ----- 

const botonCancelarCrear = document.querySelector('.cgcancelar');
const botonComenzarCrear = document.querySelector('.cgcomenzar');
const crearContenedor = document.querySelector('.contenedor-crear-guifos');
const grabarContenedor = document.querySelector('.contenedor-grabar-guifos');
const botonesCapturar = document.querySelector('.capturar-guifos-botones');
const botonCapturar = document.querySelector('.capturar-boton');
const botonCamara = document.querySelector('.camara-boton');
const botonRecording = document.querySelector('.recording-boton');
const botonCapturando = document.querySelector('.capturando-boton');
const botonesCapturando = document.querySelector('.capturando-guifos-botones');
const vistaPreviaContenedor = document.querySelector('.contenedor-vistaPrevia-guifos');
const botonVistaRepetir = document.querySelector('.vistaPrevia-repetir-boton');
const botonVistaSubir = document.querySelector('.vistaPrevia-subir-boton');
const subiendoContenedor = document.querySelector('.contenedor-subiendo-guifos');
const botonCancelarSubiendo = document.querySelector('.subiendo-cancelar-boton');
const exitoContenedor = document.querySelector('.contenedor-exito-guifos');
const botonExitoListo = document.querySelector('.listo');
const botonExitoCopiar = document.querySelector('.copiar');
const botonExitoDescargar = document.querySelector('.descargar');
const closeImg = document.querySelector('.close-img');
const closeImg2 = document.querySelector('.close-img2');
const closeImg3 = document.querySelector('.close-img3');
const gifPrevia = document.querySelector('.grabar-guifos-contenido-titulo img');
const subiendoGuifo = document.querySelector('.subiendo-guifo');
const imgSubido = document.querySelector('.subido-exito img');
const arrow = document.querySelector('.arrow-img');

apiKey = 'WU9WhGNxqjCYCPj1hrrQBhrgcs6cKB2G';




// ------ CANCELAR ----- 

botonCancelarCrear.addEventListener('click', () => {
  window.location.assign('./index.html');
});

// -----COMENZAR ------
botonComenzarCrear.addEventListener('click', () => {
  crearContenedor.style.display = 'none';
  // misGuifosContenedor.style.display = 'none';
  grabarContenedor.style.display = 'block';
  botonesCapturar.style.display = 'flex';
  activandoCamara();
});

// ----- CAPTURANDO ------
closeImg.addEventListener('click', () => {
  window.location.assign('./crearGuifos.html');
})
closeImg2.addEventListener('click', () => {
  window.location.assign('./crearGuifos.html');
})
closeImg3.addEventListener('click', () => {
  window.location.assign('./crearGuifos.html');
})

botonCapturar.addEventListener('click', () => {
  botonesCapturar.style.display = 'none';
  botonesCapturando.style.display = 'flex';
  iniciarGrabacion();
});
botonCamara.addEventListener('click', () => {
  botonesCapturar.style.display = 'none';
  botonesCapturando.style.display = 'flex';
  iniciarGrabacion();

});
botonRecording.addEventListener('click', () => {
  vistaPreviaContenedor.style.display = 'block';
  botonesCapturando.style.display = 'none';
  grabarContenedor.style.display = 'none';
  detenerGrabacion();
});
botonCapturando.addEventListener('click', () => {
  vistaPreviaContenedor.style.display = 'block';
  botonesCapturando.style.display = 'none';
  grabarContenedor.style.display = 'none';
  detenerGrabacion();
});

// ------ VISTA PREVIA ------

botonVistaRepetir.addEventListener('click', () => {
  vistaPreviaContenedor.style.display = 'none';
  botonesCapturar.style.display = 'flex';
  grabarContenedor.style.display = 'block';
  activandoCamara();
});
botonVistaSubir.addEventListener('click', () => {
  vistaPreviaContenedor.style.display = 'none';
  subiendoContenedor.style.display = 'block';
  subirGif();
});


// ------ SUBIENDO ------
botonCancelarSubiendo.addEventListener('click', () => {
  subiendoContenedor.style.display = 'none';
  botonesCapturar.style.display = 'flex';
  grabarContenedor.style.display = 'block';
  activandoCamara();
});


// ------ EXITO ------

botonExitoListo.addEventListener('click', () => {
  window.location.assign('./misGuifos.html')
});

botonExitoCopiar.addEventListener('click', () => {
  obtenerLink();
  alert('Enlace Copiado con Éxito!')
});

botonExitoDescargar.addEventListener('click', () => {
  botonExitoDescargar.href = url_gif;
  botonExitoDescargar.download = 'gif_subido.gif';
});


// ----- VARIABLES CAPTURAR -----

const gif_name = 'gif_' + (Math.random().toString(36).slice(2));
const URL_UPLOAD = 'https://upload.giphy.com/v1/gifs';
const post_body = new FormData();
post_body.append('api_key', apiKey);


const stream = () => {
  return navigator.mediaDevices.getUserMedia({ video: { width: 830, height: 432 } })
};

let abortController;
let videoPreview;
let recorder;
let url_gif;
let copy_url_gif;


// ----- ACTIVANDO CAMARA ------

function activandoCamara() {
  videoPreview = document.querySelector('video');
  stream().then((stream) => {
    videoPreview.srcObject = stream;
    videoPreview.play();
  })
}

// ------ CAPTURANDO ------

function iniciarGrabacion() {
  post_body.delete('file');
  videoPreview.play();

  stream().then((mediaStream) => {
    recorder = RecordRTC(mediaStream, {
      type: 'gif',
      frameRate: 1,
      quality: 100,
      width: 640,
      height: 360,
      hidden: 100
    })
    recorder.startRecording();
    recorder.stream = mediaStream;
  })
}

// ------ DETENER GRABACIÓN ------
function detenerGrabacion() {

  recorder.stopRecording(() => {
    post_body.append('file', recorder.getBlob(), 'migif.gif')
  });

  recorder.stream.stop();
  url_gif = URL.createObjectURL(post_body.get('file'));
  gifPrevia.src = url_gif;
}

// ----- SUBIENDO GIF ------


function subirGif() {

  fetch(URL_UPLOAD, {
    method: "post",
    body: post_body,
  })
    .then(response => { return response.json() })
    .then((data) => {

      if (data['meta'].status == 200) {
        localStorage.setItem(gif_name, data['data'].id);

        imgSubido.src = URL.createObjectURL(post_body.get('file'));
        copy_url_gif = `https://media.giphy.com/media/${data['data'].id}/giphy.gif`;

        subiendoContenedor.style.display = 'none';
        exitoContenedor.style.display = 'block';

      }
    })
    .catch((error) => {
      alert(error + '\nHubo un ERROR en la Carga, por favor vuelve a intentarlo!');
    });
}

// ----- COPIAR LINK A PORTAPAPELES ----

function obtenerLink() {
  let link = document.createElement("input");
  link.setAttribute("value", copy_url_gif);
  document.body.appendChild(link);
  link.select();
  document.execCommand("copy");
  document.body.removeChild(link);
}



