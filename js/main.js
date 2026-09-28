/* Shared behavior for every page. Page-specific code runs based on <body data-page="..."> */

const PICKUP_KEY = "flo-pickup-list";
// Categories that are whole bikes (vs. parts/accessories)
const BIKE_CATEGORIES = ["ebikes", "road", "mountain", "city", "kids"];

const $ = (sel, root = document) => root.querySelector(sel);
const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const money = (n) => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
const categoryLabel = (id) => (CATEGORIES.find((c) => c.id === id) || {}).label || id;
const productById = (id) => PRODUCTS.find((p) => p.id === id);
const locationById = (id) => LOCATIONS.find((l) => l.id === id);
// E-bikes can only be reserved where e-bikes are sold
const locationsFor = (p) => LOCATIONS.filter((l) => p.category !== "ebikes" || l.ebikes);
const mapSrc = (l) => `https://maps.google.com/maps?q=${encodeURIComponent(`${l.street}, ${l.city}`)}&output=embed`;

/* ---------- Pickup list (stored in the visitor's browser) ---------- */

function readPickup() {
  try {
    return JSON.parse(localStorage.getItem(PICKUP_KEY)) || [];
  } catch {
    return [];
  }
}

function writePickup(list) {
  try {
    localStorage.setItem(PICKUP_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable — list just won't persist */
  }
  updatePickupCount();
}

function addToPickup(id, size) {
  const list = readPickup();
  const existing = list.find((i) => i.id === id && i.size === size);
  if (existing) existing.qty += 1;
  else list.push({ id, size: size || "", qty: 1 });
  writePickup(list);
}

function updatePickupCount() {
  const count = readPickup().reduce((n, i) => n + i.qty, 0);
  document.querySelectorAll("[data-pickup-count]").forEach((el) => {
    el.textContent = count;
    el.hidden = count === 0;
  });
}

/* ---------- Header & footer ---------- */

const NAV = [
  ["index.html", "Home"],
  ["shop.html", "Shop"],
  ["services.html", "Services"],
  ["about.html", "About"],
  ["contact.html", "Contact"],
];

function renderChrome() {
  const current = location.pathname.split("/").pop() || "index.html";
  const header = $("#site-header");
  if (header) {
    header.innerHTML = `
      <div class="container header-inner">
        <a class="logo" href="index.html" aria-label="${SHOP.name} home">
          <span class="logo-mark">FLO</span><span class="logo-text">On Wheels Cycles</span>
        </a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
        <nav id="main-nav" class="main-nav">
          ${NAV.map(([href, label]) => `<a href="${href}"${href === current ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
          <a href="pickup.html" class="pickup-link"${current === "pickup.html" ? ' aria-current="page"' : ""}>
            Pickup List <span class="badge" data-pickup-count hidden>0</span>
          </a>
        </nav>
      </div>`;
    const toggle = $(".nav-toggle", header);
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  const footer = $("#site-footer");
  if (footer) {
    footer.innerHTML = `
      <div class="container footer-grid">
        <div>
          <p class="footer-brand">${SHOP.name}</p>
          <p>Bikes in Hoboken. E-bikes and bikes in West New York.<br>Proud Specialized dealer.</p>
          <p><a href="mailto:${SHOP.email}">${SHOP.email}</a></p>
        </div>
        ${LOCATIONS.map(
          (l) => `
        <div>
          <h3>${l.name}</h3>
          <p>${l.street}<br>${l.city}</p>
          <p><a href="tel:${l.phone}">${l.phoneDisplay}</a><br>
             <small>${l.ebikes ? "E-bikes + bicycles" : "Bicycles"}</small></p>
        </div>`
        ).join("")}
        <div>
          <h3>Hours</h3>
          ${hoursTable()}
        </div>
      </div>
      <p class="container copyright">&copy; ${new Date().getFullYear()} ${SHOP.name}</p>`;
  }
  updatePickupCount();
}

function hoursTable() {
  return `<table class="hours">${SHOP.hours
    .map(([d, h]) => `<tr><th scope="row">${d}</th><td>${h}</td></tr>`)
    .join("")}</table>`;
}

/* ---------- Product cards ---------- */

// Simple bike drawing used when a product has no photo yet
function placeholderArt(category) {
  const isBike = BIKE_CATEGORIES.includes(category);
  const art = isBike
    ? `<circle cx="28" cy="46" r="16"/><circle cx="92" cy="46" r="16"/>
       <path d="M28 46 L50 22 L80 22 L92 46 M50 22 L62 46 L28 46 M62 46 L80 22 M46 14 L56 14 M80 22 L76 12 L86 12"/>
       ${category === "ebikes" ? '<rect x="54" y="26" width="16" height="7" rx="2" class="batt"/>' : ""}`
    : `<circle cx="60" cy="36" r="22"/><circle cx="60" cy="36" r="7"/>
       <path d="M60 14 V22 M60 50 V58 M38 36 H46 M74 36 H82"/>`;
  return `<svg class="ph-art" viewBox="0 0 120 70" aria-hidden="true">${art}</svg>`;
}

function productImage(p) {
  return p.image
    ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.brand + " " + p.name)}" loading="lazy">`
    : `<div class="ph ph-${p.category}">${placeholderArt(p.category)}</div>`;
}

function productCard(p) {
  return `
    <article class="card">
      <a href="product.html?id=${encodeURIComponent(p.id)}" class="card-link">
        <div class="card-img">${productImage(p)}</div>
        <div class="card-body">
          <p class="card-brand">${escapeHtml(p.brand)} · ${categoryLabel(p.category)}</p>
          ${
            locationsFor(p).length < LOCATIONS.length
              ? `<p class="card-where">At ${locationsFor(p).map((l) => l.name).join(", ")} only</p>`
              : ""
          }
          <h3>${escapeHtml(p.name)}</h3>
          <p class="card-price">${money(p.price)}${p.inStock === false ? ' <span class="tag">Special order</span>' : ""}</p>
        </div>
      </a>
    </article>`;
}

/* ---------- Pages ---------- */

function initHomeProducts() {
  $("#featured").innerHTML = PRODUCTS.filter((p) => p.featured).map(productCard).join("");
  $("#home-categories").innerHTML = CATEGORIES.map(
    (c) => `<a class="cat-tile" href="shop.html?category=${c.id}">${c.label}</a>`
  ).join("");
}

function initShop() {
  const params = new URLSearchParams(location.search);
  const state = { category: params.get("category") || "all", q: "", sort: "featured" };

  const filters = $("#category-filters");
  filters.innerHTML = [{ id: "all", label: "All" }, ...CATEGORIES]
    .map((c) => `<button type="button" data-cat="${c.id}">${c.label}</button>`)
    .join("");

  const render = () => {
    filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === state.category));
    const q = state.q.trim().toLowerCase();
    let list = PRODUCTS.filter(
      (p) =>
        (state.category === "all" || p.category === state.category) &&
        (!q || `${p.name} ${p.brand} ${p.description}`.toLowerCase().includes(q))
    );
    if (state.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (state.sort === "featured") list = [...list].sort((a, b) => !!b.featured - !!a.featured);

    $("#product-grid").innerHTML = list.length
      ? list.map(productCard).join("")
      : `<p class="empty">No products match. Can't find what you need? <a href="contact.html">Ask us</a>, since we can order most things.</p>`;
    $("#result-count").textContent = `${list.length} item${list.length === 1 ? "" : "s"}`;
  };

  filters.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    state.category = b.dataset.cat;
    const url = new URL(location);
    if (state.category === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", state.category);
    history.replaceState(null, "", url);
    render();
  });
  $("#search").addEventListener("input", (e) => ((state.q = e.target.value), render()));
  $("#sort").addEventListener("change", (e) => ((state.sort = e.target.value), render()));
  render();
}

function initProduct() {
  const p = productById(new URLSearchParams(location.search).get("id"));
  const root = $("#product");
  if (!p) {
    root.innerHTML = `<h1>Product not found</h1><p><a href="shop.html">Back to the shop</a></p>`;
    return;
  }
  document.title = `${p.brand} ${p.name} | ${SHOP.name}`;
  const where = locationsFor(p);
  const whereText = where.length === LOCATIONS.length ? "Hoboken & West New York" : `${where.map((l) => l.name).join(", ")} only`;
  root.innerHTML = `
    <p class="crumbs"><a href="shop.html">Shop</a> / <a href="shop.html?category=${p.category}">${categoryLabel(p.category)}</a></p>
    <div class="product-layout">
      <div class="product-img">${productImage(p)}</div>
      <div class="product-info">
        <p class="card-brand">${escapeHtml(p.brand)}</p>
        <h1>${escapeHtml(p.name)}</h1>
        <p class="product-price">${money(p.price)}</p>
        <p class="stock ${p.inStock === false ? "out" : "in"}">
          ${p.inStock === false ? "Special order: usually arrives in 1–2 weeks" : "In stock"}
        </p>
        <p class="where">Pickup at: <strong>${whereText}</strong></p>
        ${BIKE_CATEGORIES.includes(p.category) ? `<p class="perk">∞ Includes free tune-ups for life</p>` : ""}
        <p>${escapeHtml(p.description)}</p>
        <form id="add-form" class="add-form">
          ${
            p.sizes
              ? `<label>Size
                  <select name="size" required>
                    <option value="">Choose a size</option>
                    ${p.sizes.map((s) => `<option>${escapeHtml(s)}</option>`).join("")}
                  </select>
                </label>`
              : ""
          }
          <button class="btn btn-primary" type="submit">Reserve for In-Store Pickup</button>
          <p class="form-note" id="add-msg" role="status"></p>
        </form>
        <p class="fine">No payment online. Reserve it here and pay when you pick it up.
          Not sure about sizing? Call ${where.map((l) => `${l.name} at <a href="tel:${l.phone}">${l.phoneDisplay}</a>`).join(" or ")},
          or stop by for a free fit check.</p>
      </div>
    </div>`;
  $("#add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const size = new FormData(e.target).get("size") || "";
    addToPickup(p.id, size);
    $("#add-msg").innerHTML = `Added to your pickup list. <a href="pickup.html">Review &amp; send request →</a>`;
  });
}

function initPickup() {
  const render = () => {
    const list = readPickup().filter((i) => productById(i.id));
    const box = $("#pickup-items");
    const form = $("#pickup-form");
    if (!list.length) {
      box.innerHTML = `<p class="empty">Your pickup list is empty. <a href="shop.html">Browse the shop</a>.</p>`;
      form.hidden = true;
      return;
    }
    form.hidden = false;
    let total = 0;
    box.innerHTML = `
      <table class="pickup-table">
        <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th><span class="sr-only">Remove</span></th></tr></thead>
        <tbody>
          ${list
            .map((i, idx) => {
              const p = productById(i.id);
              total += p.price * i.qty;
              return `<tr>
                <td><a href="product.html?id=${p.id}">${escapeHtml(p.brand)} ${escapeHtml(p.name)}</a>${i.size ? `<br><small>Size: ${escapeHtml(i.size)}</small>` : ""}</td>
                <td><input type="number" min="1" max="20" value="${i.qty}" data-idx="${idx}" aria-label="Quantity"></td>
                <td>${money(p.price * i.qty)}</td>
                <td><button type="button" class="link-btn" data-remove="${idx}">Remove</button></td>
              </tr>`;
            })
            .join("")}
        </tbody>
        <tfoot><tr><th colspan="2">Estimated total (before tax)</th><td colspan="2">${money(total)}</td></tr></tfoot>
      </table>`;

    // Only offer locations that carry every item on the list
    const allowed = LOCATIONS.filter((l) => list.every((i) => locationsFor(productById(i.id)).includes(l)));
    const select = $("#pickup-location");
    const prev = select.value;
    select.innerHTML = allowed
      .map((l) => `<option value="${l.id}"${l.id === prev ? " selected" : ""}>${l.name}: ${l.street}</option>`)
      .join("");
    $("#pickup-location-note").hidden = allowed.length === LOCATIONS.length;
    box.oninput = (e) => {
      if (!e.target.dataset.idx) return;
      const next = readPickup().filter((i) => productById(i.id));
      next[e.target.dataset.idx].qty = Math.max(1, parseInt(e.target.value, 10) || 1);
      writePickup(next);
      render();
    };
    box.onclick = (e) => {
      if (!e.target.dataset.remove) return;
      const next = readPickup().filter((i) => productById(i.id));
      next.splice(Number(e.target.dataset.remove), 1);
      writePickup(next);
      render();
    };
  };

  $("#pickup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const lines = readPickup()
      .filter((i) => productById(i.id))
      .map((i) => {
        const p = productById(i.id);
        return `- ${i.qty} x ${p.brand} ${p.name}${i.size ? ` (size ${i.size})` : ""}: ${money(p.price * i.qty)}`;
      });
    const loc = locationById(data.get("location"));
    const body = [
      `Pickup request from ${data.get("name")}`,
      `Pickup location: ${loc.name} (${loc.street})`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      `Preferred pickup date: ${data.get("date") || "flexible"}`,
      "",
      "Items:",
      ...lines,
      "",
      `Notes: ${data.get("notes") || "(none)"}`,
    ].join("\n");
    location.href = `mailto:${SHOP.email}?subject=${encodeURIComponent(`Pickup request (${loc.name}): ${data.get("name")}`)}&body=${encodeURIComponent(body)}`;
    $("#pickup-msg").textContent =
      "Your email app should open with the request filled in. Press send there, and we'll confirm by phone or email.";
  });
  render();
}

function initServices() {
  $("#service-list").innerHTML = SERVICES.map(
    (g) => `
    <section class="service-group">
      <h2>${escapeHtml(g.group)}${
        g.locations
          ? ` <span class="loc-badge">${g.locations.map((id) => locationById(id).name).join(", ")} only</span>`
          : ""
      }</h2>
      <ul>${g.items
        .map(
          (s) => `<li>
            <div><strong>${escapeHtml(s.name)}</strong><p>${escapeHtml(s.desc)}</p></div>
            <span class="svc-price">${escapeHtml(s.price)}</span>
          </li>`
        )
        .join("")}</ul>
    </section>`
  ).join("");
}

function initAbout() {
  $("#team").innerHTML = TEAM.map(
    (t) => `
    <article class="team-card">
      ${
        t.photo
          ? `<img class="avatar" src="${escapeHtml(t.photo)}" alt="${escapeHtml(t.name)}" loading="lazy">`
          : `<div class="avatar" aria-hidden="true">${escapeHtml(t.name.charAt(0))}</div>`
      }
      <h3>${escapeHtml(t.name)}</h3>
      <p class="role">${escapeHtml(t.role)}</p>
      <p>${escapeHtml(t.bio)}</p>
    </article>`
  ).join("");
}

function locationCards() {
  return LOCATIONS.map(
    (l) => `
    <article class="location-card">
      <h3>${l.name} <span class="loc-badge">${l.ebikes ? "E-bikes + bicycles" : "Bicycles"}</span></h3>
      <p>${l.street}<br>${l.city}</p>
      <p><a href="tel:${l.phone}">${l.phoneDisplay}</a></p>
      <p class="fine">${l.specialty}</p>
    </article>`
  ).join("");
}

function initHome() {
  initHomeProducts();
  $("#home-locations").innerHTML = locationCards();
}

function initContact() {
  $("#contact-hours").innerHTML = hoursTable();
  $("#contact-locations").innerHTML = locationCards();
  $("#contact-maps").innerHTML = LOCATIONS.map(
    (l) => `<iframe class="map" title="Map to our ${l.name} shop" src="${mapSrc(l)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
  ).join("");
  $("#contact-location").innerHTML = [`<option value="">Either / not sure</option>`, ...LOCATIONS.map((l) => `<option>${l.name}</option>`)].join("");
  $("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(e.target);
    const body = `From: ${d.get("name")}\nEmail: ${d.get("email")}\nPhone: ${d.get("phone") || "-"}\nLocation: ${d.get("location") || "Either"}\n\n${d.get("message")}`;
    location.href = `mailto:${SHOP.email}?subject=${encodeURIComponent(`[${d.get("topic")}] Website message from ${d.get("name")}`)}&body=${encodeURIComponent(body)}`;
    $("#contact-msg").textContent = "Your email app should open with your message. Press send there to reach us.";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  const init = {
    home: initHome,
    shop: initShop,
    product: initProduct,
    pickup: initPickup,
    services: initServices,
    about: initAbout,
    contact: initContact,
  }[document.body.dataset.page];
  if (init) init();
});
