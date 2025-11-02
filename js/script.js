/* =====================================================
   SCRIPT PRINCIPAL DEL SITIO
===================================================== */

/* ==============================
   GLOBAL
============================== */

/* ==============================
   HEADER
============================== */

/* ==============================
   MAIN
============================== */

// Esperamos a que todo el documento cargue
document.addEventListener("DOMContentLoaded", function() {
  const titulo = document.querySelector(".parrafo1"); // seleccionamos el h1
  const texto = titulo.textContent; // guardamos el texto original
  titulo.textContent = ""; // lo borramos para empezar "desde cero"

  let i = 0; // índice para recorrer cada letra
  let borrando = false; // indica si estamos borrando

  function escribir() {
    if (!borrando && i < texto.length) {
      // Añadir letras una a una
      titulo.textContent += texto.charAt(i);
      i++;
      setTimeout(escribir, 50); // velocidad de escritura
    } 
    else if (!borrando && i === texto.length) {
      // Pausa antes de borrar
      borrando = true;
      setTimeout(escribir, 3000); // pausa antes de empezar a borrar
    } 
    else if (borrando && i > 0) {
      // Borrar letras una a una
      titulo.textContent = texto.substring(0, i - 1);
      i--;
      setTimeout(escribir, 50); // velocidad de borrado
    } 
    else if (borrando && i === 0) {
      // Cuando termina de borrar, reinicia
      borrando = false;
      setTimeout(escribir, 500); // pausa antes de volver a escribir
    }
  }

  escribir(); // inicia la animación
});

/* ==============================
   CARRUSEL
============================== */

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".carrusel-item");
  const prevBtn = document.querySelector(".carrusel-btn.prev");
  const nextBtn = document.querySelector(".carrusel-btn.next");

  let indice = 0;
  const total = items.length;
  let intervalo;

  function mostrarImagen(index) {
    items.forEach((item, i) => {
      item.classList.toggle("activo", i === index);
    });
  }

  function siguiente() {
    indice = (indice + 1) % total;
    mostrarImagen(indice);
  }

  function anterior() {
    indice = (indice - 1 + total) % total;
    mostrarImagen(indice);
  }

  function iniciarCarrusel() {
    intervalo = setInterval(siguiente, 4000); // Cambia cada 4 segundos
  }

  function detenerCarrusel() {
    clearInterval(intervalo);
  }

  nextBtn.addEventListener("click", () => {
    siguiente();
    detenerCarrusel();
    iniciarCarrusel();
  });

  prevBtn.addEventListener("click", () => {
    anterior();
    detenerCarrusel();
    iniciarCarrusel();
  });

  mostrarImagen(indice);
  iniciarCarrusel();
});

/* ==============================
   FOOTER
============================== */