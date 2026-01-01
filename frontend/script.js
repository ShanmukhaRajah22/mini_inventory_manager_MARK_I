const API = "http://localhost:3000/items";

async function loadItems() {
  const res = await fetch(API);
  const items = await res.json();

  const container = document.getElementById("items");
  container.innerHTML = "";

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
      <button class="delete-btn" onclick="deleteItem('${item.id}')">
        Delete
      </button>
    `;

    container.appendChild(div);
  });
}

async function addItem() {
  const item = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    price: Number(document.getElementById("price").value),
    stock: Number(document.getElementById("stock").value),
  };

  if (!item.name || !item.category) return;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  document.querySelectorAll("input").forEach(i => i.value = "");
  loadItems();
}

async function deleteItem(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadItems();
}

loadItems();
