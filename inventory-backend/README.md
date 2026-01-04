# mini_inventory_manager_MARK_I
Full-stack inventory management app using Rust (Axum) backend and vanilla HTML/CSS/JS frontend with complete CRUD functionality.

## How to run

### Backend (Rust / Axum API)
1. Open a terminal in the `inventory-backend` directory.
2. Run the server:
   ```bash
   cargo run
   ```
3. The API will be available at `http://127.0.0.1:3000`.

### Frontend (vanilla HTML/CSS/JS)
1. Open the `frontend/index.html` file in your browser (double-click or "Open with" your browser).
2. The frontend talks directly to the backend at `http://localhost:3000/items`.

### Features
- Create, read, update, and delete inventory items.
- Filter items by category via `GET /items/category/:category`.
- Clear all items via `DELETE /items`.
