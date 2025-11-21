document.addEventListener("DOMContentLoaded", () => {
    const welcomeBtn = document.getElementById("welcome-btn");
    const mainContent = document.getElementById("main-content");

    welcomeBtn.addEventListener("click", () => {
        // Ocultar botón
        welcomeBtn.style.display = "none";

        // Mostrar contenido con transición
        mainContent.classList.add("show");
    });
});
