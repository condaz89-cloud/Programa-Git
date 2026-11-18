const products = [
  {
    id: 1,
    name: "212 VIP Men",
    brand: "Carolina Herrera",
    category: "Hombre",
    price: 389000,
    tag: "MÁS VENDIDO",
    rating: "★★★★★",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    name: "Good Girl",
    brand: "Carolina Herrera",
    category: "Mujer",
    price: 465000,
    tag: "DESTACADO",
    rating: "★★★★★",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    name: "Sauvage Eau de Parfum",
    brand: "Dior",
    category: "Hombre",
    price: 520000,
    tag: "",
    rating: "★★★★★",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    name: "Libre",
    brand: "Yves Saint Laurent",
    category: "Mujer",
    price: 498000,
    tag: "NOVEDAD",
    rating: "★★★★☆",
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 5,
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    category: "Unisex",
    price: 890000,
    tag: "EXCLUSIVO",
    rating: "★★★★★",
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 6,
    name: "Acqua di Gio",
    brand: "Giorgio Armani",
    category: "Hombre",
    price: 420000,
    tag: "",
    rating: "★★★★☆",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 7,
    name: "La Vie Est Belle",
    brand: "Lancôme",
    category: "Mujer",
    price: 455000,
    tag: "FAVORITO",
    rating: "★★★★★",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 8,
    name: "CK One",
    brand: "Calvin Klein",
    category: "Unisex",
    price: 275000,
    tag: "",
    rating: "★★★★☆",
    image:
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=700&q=85",
  },
];
const money = (n) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);
let category = "Todos",
  query = "";
let cart = JSON.parse(localStorage.getItem("perfumeria-cart") || "[]");
const grid = document.getElementById("productGrid");
function renderProducts() {
  let list = products.filter(
    (p) =>
      (category === "Todos" || p.category === category) &&
      `${p.name} ${p.brand} ${p.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const sort = document.getElementById("sortSelect").value;
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);
  grid.innerHTML = list
    .map(
      (p) =>
        `<article class="product-card"><div class="product-visual"><img src="${p.image}" alt="${p.name}" loading="lazy">${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}<button class="quick-add" data-add="${p.id}">AÑADIR A LA BOLSA +</button></div><div class="product-info"><span class="product-category">${p.category.toUpperCase()} · ${p.brand.toUpperCase()}</span><h3>${p.name}</h3><p>Presentación seleccionada</p><div class="price-row"><span class="price">${money(p.price)}</span><span class="rating">${p.rating}</span></div></div></article>`,
    )
    .join("");
  document.getElementById("emptyState").hidden = list.length > 0;
}
function setCategory(value) {
  category = value;
  document
    .querySelectorAll(".pill")
    .forEach((b) =>
      b.classList.toggle("selected", b.dataset.category === value),
    );
  renderProducts();
}
document.getElementById("categoryPills").addEventListener("click", (e) => {
  const b = e.target.closest("[data-category]");
  if (b) setCategory(b.dataset.category);
});
document
  .querySelectorAll(".main-nav [data-category]")
  .forEach((a) =>
    a.addEventListener("click", () => setCategory(a.dataset.category)),
  );
document.getElementById("clearFilters").addEventListener("click", () => {
  setCategory("Todos");
  document.getElementById("searchInput").value = "";
  query = "";
});
document.getElementById("searchInput").addEventListener("input", (e) => {
  query = e.target.value;
  renderProducts();
});
document
  .getElementById("sortSelect")
  .addEventListener("change", renderProducts);
function saveCart() {
  localStorage.setItem("perfumeria-cart", JSON.stringify(cart));
  renderCart();
}
function addToCart(id) {
  const item = cart.find((x) => x.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
  toast("Producto agregado a tu bolsa");
}
function renderCart() {
  const count = cart.reduce((s, x) => s + x.qty, 0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("drawerCount").textContent = `(${count})`;
  document.getElementById("cartItems").innerHTML = cart.length
    ? cart
        .map((x) => {
          const p = products.find((p) => p.id === x.id);
          return `<div class="cart-line"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><small>${x.qty} × ${money(p.price)}</small><div><button data-remove="${p.id}">Quitar</button></div></div><b>${money(p.price * x.qty)}</b></div>`;
        })
        .join("")
    : '<p class="empty-state">Tu bolsa está esperando una fragancia especial.</p>';
  document.getElementById("cartSubtotal").textContent = money(
    cart.reduce(
      (s, x) => s + products.find((p) => p.id === x.id).price * x.qty,
      0,
    ),
  );
}
grid.addEventListener("click", (e) => {
  const b = e.target.closest("[data-add]");
  if (b) addToCart(Number(b.dataset.add));
});
document.getElementById("cartItems").addEventListener("click", (e) => {
  const b = e.target.closest("[data-remove]");
  if (b) {
    cart = cart.filter((x) => x.id !== Number(b.dataset.remove));
    saveCart();
  }
});
const drawer = document.getElementById("cartDrawer"),
  backdrop = document.getElementById("drawerBackdrop");
function openCart() {
  drawer.classList.add("open");
  backdrop.classList.add("open");
}
function closeCart() {
  drawer.classList.remove("open");
  backdrop.classList.remove("open");
}
document.getElementById("cartBtn").onclick = openCart;
document.getElementById("closeCart").onclick = closeCart;
backdrop.onclick = closeCart;
const modal = document.getElementById("modalBackdrop");
document.getElementById("accountBtn").onclick = () =>
  modal.classList.add("open");
document.getElementById("closeModal").onclick = () =>
  modal.classList.remove("open");
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});
document.getElementById("loginDemo").onsubmit = (e) => {
  e.preventDefault();
  modal.classList.remove("open");
  toast("Inicio de sesión de demostración. Falta conectar el backend.");
};
document.getElementById("checkoutBtn").onclick = () =>
  toast(
    cart.length
      ? "El proceso de pago se habilitará al conectar PayU."
      : "Agrega productos antes de continuar.",
  );
document.getElementById("newsletterForm").onsubmit = (e) => {
  e.preventDefault();
  document.getElementById("newsletterMsg").textContent =
    "¡Gracias! Tu correo quedó registrado en esta demostración.";
  e.target.reset();
};
function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}
document.getElementById("mobileMenu").onclick = () =>
  document.getElementById("mainNav").classList.toggle("open");
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    document.getElementById("searchInput").focus();
  }
  if (e.key === "Escape") {
    closeCart();
    modal.classList.remove("open");
  }
});
renderProducts();
renderCart();
