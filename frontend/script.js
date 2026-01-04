const API = "http://localhost:3000/items";

/* ---------- DOM ELEMENTS ---------- */
const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const stockInput = document.getElementById("stock");

const formTitle = document.getElementById("form-title");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const itemsContainer = document.getElementById("items");

const filterCategoryInput = document.getElementById("filterCategory");
const filterBtn = document.getElementById("filterBtn");
const clearFilterBtn = document.getElementById("clearFilterBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

/* ---------- STATE ---------- */
let editingId = null;
let currentCategoryFilter = null;

/* ---------- LOAD ITEMS ---------- */
async function loadItems(category = null) {
  try {
    const url = category
      ? `${API}/category/${encodeURIComponent(category)}`
      : API;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to load items (status ${res.status})`);
    }

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
  } catch (err) {
    console.error(err);
    alert("Could not load items. Please make sure the backend is running.");
  }
}

/* ---------- ATTACH BUTTON HANDLERS ---------- */
function attachItemHandlers() {
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.onclick = () => editItem(btn.dataset.id);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = () => deleteItem(btn.dataset.id);
  });
}

/* ---------- ADD / UPDATE ---------- */
async function saveItem() {
  const item = {
    name: nameInput.value.trim(),
    category: categoryInput.value.trim(),
    price: Number(priceInput.value),
    stock: Number(stockInput.value),
  };

  if (!item.name || !item.category) {
    alert("Name and category are required.");
    return;
  }

  try {
    if (editingId) {
      // UPDATE
      const res = await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!res.ok) {
        throw new Error(`Failed to update item (status ${res.status})`);
      }
    } else {
      // CREATE
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!res.ok) {
        throw new Error(`Failed to create item (status ${res.status})`);
      }
    }

    resetForm();
    loadItems(currentCategoryFilter);
  } catch (err) {
    console.error(err);
    alert("Could not save item. Please try again.");
  }
}

/* ---------- EDIT ---------- */
async function editItem(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to load item (status ${res.status})`);
    }
    const item = await res.json();

    editingId = id;

    nameInput.value = item.name;
    categoryInput.value = item.category;
    priceInput.value = item.price;
    stockInput.value = item.stock;

    formTitle.textContent = "Edit Item";
    saveBtn.textContent = "Save Changes";
    cancelBtn.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    alert("Could not load item for editing. It may have been deleted.");
  }
}

/* ---------- DELETE ---------- */
async function deleteItem(id) {
  const confirmed = confirm("Are you sure you want to delete this item?");
  if (!confirmed) return;

  try {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to delete item (status ${res.status})`);
    }
    loadItems(currentCategoryFilter);
  } catch (err) {
    console.error(err);
    alert("Could not delete item. Please try again.");
  }
}

/* ---------- FILTER / CLEAR / BULK ---------- */
function applyCategoryFilter() {
  const category = filterCategoryInput.value.trim();
  currentCategoryFilter = category || null;
  loadItems(currentCategoryFilter);
}

function clearFilter() {
  filterCategoryInput.value = "";
  currentCategoryFilter = null;
  loadItems();
}

async function clearAllItems() {
  const confirmed = confirm("This will delete ALL items. Continue?");
  if (!confirmed) return;

  try {
    const res = await fetch(API, { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to clear items (status ${res.status})`);
    }
    currentCategoryFilter = null;
    loadItems();
  } catch (err) {
    console.error(err);
    alert("Could not clear items. Please try again.");
  }
}

/* ---------- RESET ---------- */
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

/* ---------- EVENT BINDINGS ---------- */
saveBtn.onclick = saveItem;
cancelBtn.onclick = resetForm;
filterBtn.onclick = applyCategoryFilter;
clearFilterBtn.onclick = clearFilter;
clearAllBtn.onclick = clearAllItems;

/* ---------- INIT ---------- */
loadItems();
