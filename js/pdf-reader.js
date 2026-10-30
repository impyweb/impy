import * as pdfjsLib from
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.4.299/build/pdf.mjs";

// Configuración del worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@6.4.299/build/pdf.worker.mjs";

// Ruta relativa del documento
const url = "documents/documento.pdf";

// Elementos HTML
const canvas = document.getElementById("pdf-canvas");
const ctx = canvas.getContext("2d");

const viewer = document.querySelector(".pdf-viewer");

const prevBtn = document.getElementById("pdf-prev");
const nextBtn = document.getElementById("pdf-next");

const zoomInBtn = document.getElementById("pdf-zoom-in");
const zoomOutBtn = document.getElementById("pdf-zoom-out");

const pageInfo = document.getElementById("pdf-page-info");
const errorMessage = document.getElementById("pdf-error");

// Variables
let pdfDoc = null;
let pageNum = 1;
let zoom = 1;

// Cargar documento
async function cargarPDF() {

  try {

    pdfDoc = await pdfjsLib.getDocument(url).promise;

    renderizarPagina();

  } catch (error) {

    errorMessage.textContent =
      "No fue posible cargar el documento PDF.";

    console.error(error);

  }

}

// Renderizar página
async function renderizarPagina() {

  if (!pdfDoc) return;

  const page = await pdfDoc.getPage(pageNum);

  const originalViewport = page.getViewport({
    scale: 1
  });

  // Ajuste automático al ancho disponible
  const anchoDisponible = viewer.clientWidth - 40;

  const escalaAjustada =
    anchoDisponible / originalViewport.width;

  const escalaFinal = escalaAjustada * zoom;

  const viewport = page.getViewport({
    scale: escalaFinal
  });

  // Resolución para pantallas de alta densidad
  const outputScale = window.devicePixelRatio || 1;

  canvas.width = Math.floor(viewport.width * outputScale);
  canvas.height = Math.floor(viewport.height * outputScale);

  canvas.style.width = `${viewport.width}px`;
  canvas.style.height = `${viewport.height}px`;

  const transform = outputScale !== 1
    ? [outputScale, 0, 0, outputScale, 0, 0]
    : null;

  await page.render({
    canvasContext: ctx,
    viewport: viewport,
    transform: transform
  }).promise;

  // Actualizar controles
  pageInfo.textContent =
    `Página ${pageNum} de ${pdfDoc.numPages}`;

  prevBtn.disabled = pageNum <= 1;
  nextBtn.disabled = pageNum >= pdfDoc.numPages;

}

// Navegación
prevBtn.addEventListener("click", () => {

  if (pageNum > 1) {
    pageNum--;
    renderizarPagina();
  }

});

nextBtn.addEventListener("click", () => {

  if (pageNum < pdfDoc.numPages) {
    pageNum++;
    renderizarPagina();
  }

});

// Zoom
zoomInBtn.addEventListener("click", () => {

  zoom = Math.min(zoom + 0.2, 3);
  renderizarPagina();

});

zoomOutBtn.addEventListener("click", () => {

  zoom = Math.max(zoom - 0.2, 0.6);
  renderizarPagina();

});

// Adaptación al cambio de tamaño
window.addEventListener("resize", () => {

  renderizarPagina();

});

// Inicializar
cargarPDF();