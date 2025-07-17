// Slider automático
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
setInterval(nextSlide, 5000);

// Menú móvil
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

// Modales
function openModal(id) {
  document.getElementById(id).style.display = "block";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Datos de contenido
const contentData = {
  continueWatching: [
    {
      title: "Cosmos",
      genre: "Documental",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Neón Genesis",
      genre: "Sci-Fi",
      rating: 4.6,
      image: "https://es.web.img2.acsta.net/pictures/18/12/07/12/40/4530128.jpg"
    },
    {
      title: "Quantum Realms",
      genre: "Thriller",
      rating: 4.7,
      image: "https://m.media-amazon.com/images/M/MV5BMThkYWY5ZjQtYjJlMS00MDFmLWFkYzEtODEzZjg5YWFmMGY4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    }
  ],
  popularContent: [
    {
      title: "Matrix Reloaded",
      genre: "Sci-Fi",
      rating: 4.9,
      image: "https://images.justwatch.com/poster/251725999/s718/the-matrix-reloaded.jpg"
    }
  ],
  scifiSeries: [
    {
      title: "Stellar Wars",
      genre: "Sci-Fi",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2070&q=80"
    }
  ],
  documentaries: [
    {
      title: "Vida Marina",
      genre: "Naturaleza",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2070&q=80"
    }
  ]
};

// Crear tarjetas
function createCard(item) {
  const card = document.createElement("div");
  card.className = "content-card";
  card.innerHTML = `
    <div class="card-image" style="background-image: url('${item.image}')">
      <div class="card-overlay">
        <div class="play-button"><i class="fas fa-play"></i></div>
      </div>
    </div>
    <div class="card-info">
      <div class="card-title">${item.title}</div>
      <div class="card-meta">
        <span>${item.genre}</span>
        <div class="card-rating">
          <i class="fas fa-star"></i> ${item.rating}
        </div>
      </div>
    </div>
  `;
  return card;
}

// Renderizar contenido
function renderContent() {
  Object.keys(contentData).forEach(sectionId => {
    const container = document.getElementById(sectionId);
    contentData[sectionId].forEach(item => {
      container.appendChild(createCard(item));
    });
  });
}

// Validaciones de formularios
function setupFormValidation() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    validateForm("login");
  });

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    validateForm("register");
  });
}

function validateForm(type) {
  const prefix = type === "login" ? "login" : "register";

  const email = document.getElementById(`${prefix}Email`);
  const password = document.getElementById(`${prefix}Password`);
  const name = document.getElementById("registerName");

  const emailError = email.nextElementSibling;
  const passError = password.nextElementSibling;
  const nameError = name ? name.nextElementSibling : null;

  // Reset errores
  email.classList.remove("error");
  password.classList.remove("error");
  emailError.style.display = "none";
  passError.style.display = "none";
  if (name) {
    name.classList.remove("error");
    nameError.style.display = "none";
  }

  let valid = true;

  if (!email.value.includes("@")) {
    email.classList.add("error");
    emailError.style.display = "block";
    valid = false;
  }

  if (password.value.length < 8) {
    password.classList.add("error");
    passError.style.display = "block";
    valid = false;
  }

  if (type === "register" && name.value.trim() === "") {
    name.classList.add("error");
    nameError.style.display = "block";
    valid = false;
  }

  if (valid) {
    alert(`${type === "login" ? "Sesión iniciada" : "Cuenta creada"} con éxito 😎`);
  }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  renderContent();
  setupFormValidation();
});
