// === Referencias ===
const contenedor = document.getElementById("contenedor");
const canvas = document.getElementById("infoCanvas");
const ctx = canvas.getContext("2d");

// === Textos asociados ===
const textos = [
  "Innovación en desarrollo web ImPy es una plataforma dedicada al desarrollo de sitios web modernos y funcionales. Creamos tanto páginas estáticas como dinámicas, adaptadas a cualquier tipo de proyecto.",
  "Versatilidad para todos los clientes Diseñamos websites para negocios grandes, medianos y pequeños. También realizamos sitios personales, portafolios y blogs.",
  "Enfoque personalizado Cada proyecto es tratado como único, con atención al detalle y coherencia estética. Nuestro equipo trabaja para reflejar la identidad y objetivos de cada cliente.",
  "Variedad de estilos Podemos desarrollar desde páginas informativas simples hasta tiendas en línea complejas. Ofrecemos opciones que combinan diseño, rendimiento y escalabilidad.",
  "Personalización total En ImPy creemos que tu sitio debe ser tan flexible como tu visión. Por eso, cada elemento puede ser adaptado a tus necesidades específicas.",
  "Elección de alojamiento Damos libertad al cliente para decidir dónde alojar su web. Ofrecemos asesoría para plataformas como GitHub Pages, WordPress, Shopify o Wix.",
  "Asesoramiento estratégico Nuestro equipo te orienta sobre la mejor plataforma según el tipo y tamaño de tu proyecto. La meta es que elijas la opción más rentable y funcional.",
  "Transparencia ante todo En ImPy actuamos con ética y claridad en cada paso del proceso. Evitamos prácticas opacas que limiten tu acceso al sitio final.",
  "Control total del cliente Recomendamos que tú crees la cuenta principal del sitio. De esa forma, mantienes siempre la propiedad y el control del proyecto.",
  "Colaboración segura Una vez creada tu cuenta, te enseñamos cómo agregarnos como editores o administradores. Así podemos avanzar con el diseño sin comprometer tu acceso.",
  "Protección frente a malas prácticas Sabemos que algunos desarrolladores retienen el control de los sitios. En ImPy trabajamos para revertir esa tendencia y empoderar al cliente.",
  "Diseño y funcionalidad equilibrados Buscamos que cada web no solo se vea bien, sino que funcione de manera eficiente. La experiencia del usuario es parte esencial de nuestro trabajo.",
  "Actualización constante Nos mantenemos al día con las nuevas tecnologías y tendencias del desarrollo web. Esto garantiza soluciones modernas y sostenibles.",
  "Soporte continuo Ofrecemos acompañamiento antes, durante y después del lanzamiento. Nuestro compromiso es que tu sitio crezca contigo.",
  "Tu visión, nuestro código En ImPy combinamos creatividad y técnica para materializar tus ideas. Más que diseñar sitios, construimos espacios digitales que reflejan quién eres."
];

// === Crear burbujas ===
const numBurbujas = 15;
const colores = ["#00FFFF", "#FF00FF", "#00BFFF", "#FF69B4", "#7B68EE", "#00CED1"];
const burbujas = [];

for (let i = 1; i <= numBurbujas; i++) {
    const b = document.createElement("div");
    b.classList.add("burbuja");
    b.dataset.id = i;
    b.textContent = i;
    b.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
    contenedor.appendChild(b);

    const size = 50 + Math.random() * 30;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;

    let x = Math.random() * (window.innerWidth - size);
    let y = Math.random() * (window.innerHeight - size);
    let vx = (Math.random() - 0.5) * 1.5;
    let vy = (Math.random() - 0.5) * 1.5;

    burbujas.push({ el: b, x, y, vx, vy, size });
}

// === Movimiento con rebote ===
function moverBurbujas() {
    burbujas.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x <= 0 || b.x + b.size >= window.innerWidth) b.vx *= -1;
        if (b.y <= 0 || b.y + b.size >= window.innerHeight) b.vy *= -1;

        b.el.style.left = `${b.x}px`;
        b.el.style.top = `${b.y}px`;
    });

    requestAnimationFrame(moverBurbujas);
}

moverBurbujas();

// === Mostrar texto en el canvas ===
function mostrarTextoCanvas(texto) {
    const maxWidth = canvas.width - 40;
    const lineHeight = 26;
    const fontSize = 20;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo oscuro igual al fondo principal
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#0f2027");
    gradient.addColorStop(0.5, "#203a43");
    gradient.addColorStop(1, "#2c5364");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Texto blanco, divertido
    ctx.fillStyle = "#ffffff";
    ctx.font = `${fontSize}px "Comic Sans MS", "Poppins", sans-serif`;
    ctx.textBaseline = "top";

    const palabras = texto.split(" ");
    let linea = "";
    let y = 20;
    for (let palabra of palabras) {
        const testLine = linea + palabra + " ";
        const ancho = ctx.measureText(testLine).width;
        if (ancho > maxWidth && linea.length > 0) {
            ctx.fillText(linea, 20, y);
            linea = palabra + " ";
            y += lineHeight;
        } else {
            linea = testLine;
        }
    }
    ctx.fillText(linea, 20, y);
}

// === Clic en burbuja ===
contenedor.addEventListener("click", e => {
    const bubble = e.target.closest(".burbuja");
    if (!bubble) return;

    const id = parseInt(bubble.dataset.id, 10);
    const texto = textos[id - 1];
    mostrarTextoCanvas(texto);

    bubble.classList.add("destello");
    setTimeout(() => bubble.classList.remove("destello"), 400);
});

// === Ajustar límites al redimensionar ===
window.addEventListener("resize", () => {
    burbujas.forEach(b => {
        b.x = Math.min(b.x, window.innerWidth - b.size);
        b.y = Math.min(b.y, window.innerHeight - b.size);
    });
});
