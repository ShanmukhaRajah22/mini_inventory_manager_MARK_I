const API = "http://localhost:3000/items";


const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const stockInput = document.getElementById("stock");

const formTitle = document.getElementById("form-title");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const itemsContainer = document.getElementById("items");

let editingId = null;


async function loadItems() {
  const res = await fetch(API);
  const items = await res.json();

  itemsContainer.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div class="item-info">
        <span class="item-name">${item.name}</span>
        <span class="item-meta">
          ${item.category} • ₹${item.price} • Stock: ${item.stock}
        </span>
      </div>
      <div class="item-actions">
        <button class="edit-btn" data-id="${item.id}">Edit</button>
        <button class="delete-btn" data-id="${item.id}">Delete</button>
      </div>
    `;

    itemsContainer.appendChild(div);
  });

  attachItemHandlers();
}


function attachItemHandlers() {
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.onclick = () => editItem(btn.dataset.id);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = () => deleteItem(btn.dataset.id);
  });
}


async function saveItem() {
  const item = {
    name: nameInput.value.trim(),
    category: categoryInput.value.trim(),
    price: Number(priceInput.value),
    stock: Number(stockInput.value),
  };

  if (!item.name || !item.category) return;

  if (editingId) {
    // UPDATE
    await fetch(`${API}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
  } else {
    // CREATE
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
  }

  resetForm();
  loadItems();
}


async function editItem(id) {
  const res = await fetch(`${API}/${id}`);
  const item = await res.json();

  editingId = id;

  nameInput.value = item.name;
  categoryInput.value = item.category;
  priceInput.value = item.price;
  stockInput.value = item.stock;

  formTitle.textContent = "Edit Item";
  saveBtn.textContent = "Save Changes";
  cancelBtn.classList.remove("hidden");
}


async function deleteItem(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadItems();
}


function resetForm() {
  editingId = null;

  nameInput.value = "";
  categoryInput.value = "";
  priceInput.value = "";
  stockInput.value = "";

  formTitle.textContent = "Add Item";
  saveBtn.textContent = "Add Item";
  cancelBtn.classList.add("hidden");
}


saveBtn.onclick = saveItem;
cancelBtn.onclick = resetForm;

loadItems();
