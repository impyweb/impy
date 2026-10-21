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

document.addEventListener("DOMContentLoaded", function() {

  /* ------------------------------
     ANIMACIÓN DEL TÍTULO
  ------------------------------ */
  const titulo = document.querySelector(".parrafo1");
  if (titulo) {
    const texto = titulo.textContent;
    titulo.textContent = "";

    let i = 0;
    let borrando = false;

    function escribir() {
      if (!borrando && i < texto.length) {
        titulo.textContent += texto.charAt(i);
        i++;
        setTimeout(escribir, 50);
      } 
      else if (!borrando && i === texto.length) {
        borrando = true;
        setTimeout(escribir, 3000);
      } 
      else if (borrando && i > 0) {
        titulo.textContent = texto.substring(0, i - 1);
        i--;
        setTimeout(escribir, 50);
      } 
      else if (borrando && i === 0) {
        borrando = false;
        setTimeout(escribir, 500);
      }
    }

    escribir();
  }

  /* ------------------------------
     CARRUSEL
  ------------------------------ */
  const items = document.querySelectorAll(".carrusel-item");
  if (items.length > 0) {
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
      intervalo = setInterval(siguiente, 4000);
    }

    function detenerCarrusel() {
      clearInterval(intervalo);
    }

    nextBtn?.addEventListener("click", () => {
      siguiente();
      detenerCarrusel();
      iniciarCarrusel();
    });

    prevBtn?.addEventListener("click", () => {
      anterior();
      detenerCarrusel();
      iniciarCarrusel();
    });

    mostrarImagen(indice);
    iniciarCarrusel();
  }

  /* ------------------------------
     PREGUNTAS FRECUENTES (FAQ)
  ------------------------------ */
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;

      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
          otherQuestion.classList.remove('active');
          otherQuestion.nextElementSibling.classList.remove('open');
        }
      });

      question.classList.toggle('active');
      answer.classList.toggle('open');
    });
  });

});

/* ==============================
   FOOTER
============================== */