const cards = [...document.querySelectorAll("[data-product]")];
const products = new Map(cards.map((card) => [
  card.dataset.product,
  {
    name: card.dataset.name,
    description: card.dataset.description,
    category: card.querySelector("span").textContent,
    photo: card.querySelector("img").src,
  },
]));

const search = document.querySelector("#search");
const searchEmpty = document.querySelector("#search-empty");
const searchStatus = document.querySelector("#search-status");
const dialog = document.querySelector("#store-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogContent = document.querySelector("#dialog-content");
const bagCount = document.querySelector("#bag-count");
const bagButton = document.querySelector('[data-panel="bag"]');
const storageKey = "skins-storefront";

const saved = readSavedItems();
const favorites = new Set(saved.favorites);
const bag = new Map(saved.bag);
updateBagCount();

const information = {
  about: ["About Skins", "Skins brings serum, cleanser, cream and lotion together for an everyday skincare routine."],
  contact: ["Contact", "Skins contact details will be available when the shop launches."],
  address: ["Address", "Store address details will be available when the shop launches."],
  policy: ["Store policy", "The storefront preview keeps your favorites and bag on this device. Orders and payments are unavailable in the preview."],
  youtube: ["YouTube", "The Skins YouTube channel will be available when the shop launches."],
  whatsapp: ["WhatsApp", "Skins WhatsApp support will be available when the shop launches."],
  messenger: ["Messenger", "Skins Messenger support will be available when the shop launches."],
};

function readSavedItems() {
  try {
    const items = JSON.parse(localStorage.getItem(storageKey));
    return {
      favorites: items.favorites.filter((id) => products.has(id)),
      bag: items.bag.filter(([id, quantity]) => products.has(id) && Number.isSafeInteger(quantity) && quantity > 0),
    };
  } catch {
    return { favorites: [], bag: [] };
  }
}

function saveItems() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ favorites: [...favorites], bag: [...bag] }));
  } catch {
    // Keep the current session usable when browser storage is unavailable.
  }
}

function updateBagCount() {
  const quantity = [...bag.values()].reduce((total, count) => total + count, 0);
  bagCount.hidden = quantity === 0;
  bagCount.textContent = quantity;
  bagButton.setAttribute("aria-label", quantity ? `Shopping bag, ${quantity} items` : "Shopping bag");
}

function filterProducts() {
  const query = search.value.trim().toLowerCase();
  let matches = 0;

  for (const card of cards) {
    const { name, category } = products.get(card.dataset.product);
    card.hidden = !`${name} ${category}`.toLowerCase().includes(query);
    if (!card.hidden) matches += 1;
  }

  searchEmpty.hidden = matches > 0;
  searchStatus.textContent = query && matches
    ? `${matches} ${matches === 1 ? "product" : "products"} found.`
    : query ? searchEmpty.textContent : "";
}

search.addEventListener("input", filterProducts);
document.querySelector("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  filterProducts();
  document.querySelector("#shop").scrollIntoView();
});

function showDialog(title, ...content) {
  dialogTitle.textContent = title;
  dialogContent.replaceChildren(...content);
  if (dialog.open) dialog.querySelector("button").focus();
  else dialog.showModal();
}

function paragraph(text, className = "") {
  const element = document.createElement("p");
  element.textContent = text;
  element.className = className;
  return element;
}

function action(label, className, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  button.addEventListener("click", handler);
  return button;
}

function showProduct(id) {
  const product = products.get(id);
  const photo = document.createElement("img");
  photo.src = product.photo;
  photo.alt = product.name;
  photo.className = "dialog-photo";

  const controls = document.createElement("div");
  controls.className = "dialog-actions";
  const status = paragraph("", "dialog-status");
  status.setAttribute("role", "status");

  const addToBag = action("Add to bag", "btn dialog-button", () => {
    bag.set(id, (bag.get(id) ?? 0) + 1);
    updateBagCount();
    saveItems();
    status.textContent = `${product.name} added to your bag. Quantity ${bag.get(id)}.`;
  });

  const favorite = action("Favorite", "btn dialog-button", () => {
    if (!favorites.delete(id)) favorites.add(id);
    favorite.setAttribute("aria-pressed", favorites.has(id));
    saveItems();
  });
  favorite.setAttribute("aria-pressed", favorites.has(id));
  controls.append(addToBag, favorite);

  showDialog(product.name, photo, paragraph(product.description), controls, status);
}

function showCollection(isBag) {
  const title = isBag ? "Shopping bag" : "Favorites";
  const ids = isBag ? [...bag.keys()] : [...favorites];
  const items = document.createElement("ul");
  items.className = "dialog-list";

  for (const id of ids) {
    const product = products.get(id);
    const item = document.createElement("li");
    item.className = "dialog-item";
    const productName = action(product.name, "dialog-product-link", () => showProduct(id));
    const remove = action("Remove", "btn dialog-button", () => {
      if (isBag) bag.delete(id);
      else favorites.delete(id);
      updateBagCount();
      saveItems();
      showCollection(isBag);
    });
    remove.setAttribute("aria-label", `Remove ${product.name}`);

    item.append(productName);
    if (isBag) item.append(paragraph(`Quantity ${bag.get(id)}`, "dialog-quantity"));
    item.append(remove);
    items.append(item);
  }

  const empty = isBag ? "Your shopping bag is empty." : "Save a product to see it here.";
  showDialog(title, ids.length ? items : paragraph(empty));
}

for (const button of document.querySelectorAll("[data-product], [data-open-product]")) {
  button.addEventListener("click", () => showProduct(button.dataset.product ?? button.dataset.openProduct));
}

for (const button of document.querySelectorAll("[data-panel]")) {
  button.addEventListener("click", () => {
    const { panel } = button.dataset;
    if (panel === "bag" || panel === "favorites") {
      showCollection(panel === "bag");
    } else {
      const [title, copy] = information[panel];
      showDialog(title, paragraph(copy));
    }
  });
}
