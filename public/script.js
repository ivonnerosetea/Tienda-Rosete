// = LISTA DE FAVORITOS =
const favoritos = {};
const favoritosContenedor = document.getElementById("favoritos");
const listaFavoritos = document.getElementById("lista-favoritos");
const mensajeFavorito = document.getElementById("mensaje-favorito");
const iconoFavoritos = document.getElementById("icono-favoritos"); // el primer ícono es el corazón

// Mostrar/ocultar favoritos al hacer clic en el ícono del header
iconoFavoritos.addEventListener("click", (e) => {
  e.preventDefault();
  favoritosContenedor.style.display =
    favoritosContenedor.style.display === "block" ? "none" : "block";
  verificarFavoritos();
});

// Agregar artículos a favoritos desde el botón ❤️
document.querySelectorAll(".heart").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const producto = e.target.closest(".product");
    const nombre = producto.querySelector("p").innerText;
    const imagen = producto.querySelector("img").getAttribute("src");

    if (!favoritos[nombre]) {
      favoritos[nombre] = { nombre, imagen };
    }

    renderFavoritos();
  });
});

// Renderizar favoritos
function renderFavoritos() {
  listaFavoritos.innerHTML = "";

  Object.values(favoritos).forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
  <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 10px;">
    <div style="display: flex; align-items: center; gap: 10px;">
      <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: auto;">
      <span>${item.nombre}</span>
    </div>
    <button class="btn-comprar-fav">Comprar</button>
  </div>
`;

    // Al hacer clic en "Comprar", agregar al carrito
    li.querySelector(".btn-comprar-fav").addEventListener("click", () => {
      if (!carrito[item.nombre]) {
        carrito[item.nombre] = { cantidad: 1, precio: 0, imagen: item.imagen }; // el precio se actualizará abajo
      } else {
        carrito[item.nombre].cantidad++;
      }

      // Buscar el precio original desde productos en el DOM
      document.querySelectorAll(".product").forEach((producto) => {
        const nombreProducto = producto.querySelector("p")?.innerText;
        const precioTexto = producto.querySelectorAll("p")[1]?.innerText;
        const precio = parseFloat(precioTexto.replace("$MXN", "").replace(",", ""));

        if (nombreProducto === item.nombre) {
          carrito[item.nombre].precio = precio;
        }
      });

      renderCarrito();
    });

    listaFavoritos.appendChild(li);
  });

  verificarFavoritos();
}

// Mostrar mensaje si no hay favoritos
function verificarFavoritos() {
  const vacio = Object.keys(favoritos).length === 0;
  mensajeFavorito.style.display = vacio ? "block" : "none";
}

// Cerrar favoritos
document.addEventListener("click", function (event) {
  const clickDentroFavoritos = favoritosContenedor.contains(event.target);
  const clickIconoFavoritos = iconoFavoritos.contains(event.target);

  if (!clickDentroFavoritos && !clickIconoFavoritos) {
    favoritosContenedor.style.display = "none";
  }
});

// = CARRITO DE COMPRAS =
const carritoIcono = document.getElementById("carrito-icono");
const contenedorCarrito = document.getElementById("carrito");
const mensajeVacio = document.getElementById("mensaje-vacio");
const carritoLista = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");
const comprarBtn = document.getElementById("comprar-btn");

const carrito = {};

// Detectar todos los botones "Añadir al carrito"
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const producto = e.target.closest(".product");

    const nombre = producto.querySelector("p").innerText;
    const precioTexto = producto.querySelectorAll("p")[1].innerText;
    const precio = parseFloat(precioTexto.replace("$MXN", "").replace(",", ""));
    const imagen = producto.querySelector("img").getAttribute("src");

    if (!carrito[nombre]) {
      carrito[nombre] = { cantidad: 1, precio, imagen };
    } else {
      carrito[nombre].cantidad++;
    }

    renderCarrito(); 
  });
});

// Mostrar/ocultar el carrito al hacer clic en el ícono
carritoIcono.addEventListener("click", (e) => {
  e.preventDefault();
  contenedorCarrito.style.display = (contenedorCarrito.style.display === "none" || contenedorCarrito.style.display === "") ? "block" : "none";
  verificarCarritoVacio();
});

// Función para verificar si el carrito está vacío
function verificarCarritoVacio() {
  const vacio = Object.keys(carrito).length === 0;
  mensajeVacio.style.display = vacio ? "block" : "none";
}

// Función para renderizar el carrito
function renderCarrito() {
  carritoLista.innerHTML = "";
  let total = 0;

    Object.entries(carrito).forEach(([nombre, item]) => {
      const li = document.createElement("li");
    
      li.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${item.imagen}" alt="${nombre}" style="width: 50px; height: auto; object-fit: cover;">
          <div>
            <strong>${nombre}</strong><br>
            $${item.precio.toFixed(2)} x ${item.cantidad}
            <div>
              <button class="btn-menos">➖</button>
              <button class="btn-mas">➕</button>
              <button class="btn-remover">Remover</button>
            </div>
          </div>
        </div>
      `;

    li.querySelector(".btn-mas").addEventListener("click", () => {
      carrito[nombre].cantidad++;
      renderCarrito();
    });

    li.querySelector(".btn-menos").addEventListener("click", () => {
      carrito[nombre].cantidad--;
      if (carrito[nombre].cantidad <= 0) delete carrito[nombre];
      renderCarrito();
    });

    li.querySelector(".btn-remover").addEventListener("click", () => {
      delete carrito[nombre];
      renderCarrito();
    });

    carritoLista.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalSpan.textContent = `$${total.toFixed(2)}`;
  verificarCarritoVacio();
}

// Cerrar carrito
document.addEventListener("click", function (event) {
  const clickDentroCarrito = contenedorCarrito.contains(event.target);
  const clickIconoCarrito = carritoIcono.contains(event.target);

  if (!clickDentroCarrito && !clickIconoCarrito) {
    contenedorCarrito.style.display = "none";
  }
});



// = ARTÍCULOS COLOR FAVORITO =
let currentPage = 1;
const totalPages = 3;

function showPage(n) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById('page' + n).classList.add('active');
}

function nextPage() {
  currentPage = currentPage < totalPages ? currentPage + 1 : 1;
  showPage(currentPage);
}

function prevPage() {
  currentPage = currentPage > 1 ? currentPage - 1 : totalPages;
  showPage(currentPage);
}

document.querySelectorAll('.heart').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.style.color = btn.style.color === 'gray' ? '#dc3545' : 'gray';
  });
}); 