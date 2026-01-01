🧾 Mini Inventory Manager (Mark I)

A full-stack inventory management application built with a Rust (Axum) backend and a vanilla HTML/CSS/JavaScript frontend.
The project demonstrates real-world backend architecture, RESTful CRUD APIs, and a responsive, interactive UI for managing electronic products.

✨ Features

-Full CRUD operations (Create, Read, Update, Delete)
-RESTful API built with Axum (Rust)
-Shared application state management
-Clean, modular backend structure
-Modern, colorful, responsive frontend UI
-Frontend–backend communication via JSON over HTTP
-No frameworks on the frontend (pure HTML/CSS/JS)

🖥️ Screenshots


🧱 Project Structure

inventory-backend/
├── frontend/              # HTML / CSS / JS frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── src/                   # Rust backend (Axum)
│   ├── main.rs            # Server bootstrap
│   ├── routes.rs          # API routes
│   ├── handlers.rs        # Request handlers
│   ├── models.rs          # Data models
│   └── state.rs           # Shared application state
│
├── Cargo.toml
├── Cargo.lock
├── .gitignore
├── LICENSE
└── README.md

Endpoints
Method	Endpoint	Description
GET	/items	Get all items
GET	/items/:id	Get item by ID
POST	/items	Create new item
PUT	/items/:id	Update item
DELETE	/items/:id	Delete item
Example Item
{
  "id": "uuid",
  "name": "iPhone 14",
  "category": "Mobile",
  "price": 70000,
  "stock": 5
}

🛠️ Tech Stack
Backend

Rust

Axum (async web framework)

Tokio (async runtime)

Serde (JSON serialization)

Frontend

HTML5

CSS3

JavaScript (Fetch API)

▶️ How to Run Locally
Backend
cargo run


Server runs at:

http://localhost:3000

Frontend

Open frontend/index.html directly in the browser.

📈 What This Project Demonstrates

Real backend routing and state management in Rust

Clean separation of concerns (routes, handlers, models)

API-first backend design

Practical frontend–backend integration

Understanding of scalability fundamentals (stateless APIs)

🔮 Future Improvements

Database integration (PostgreSQL + SQLx)

Authentication & authorization

Edit (PUT) support from UI

Pagination & filtering

Serve frontend statically from Rust backend

Deployment (Docker / Fly.io / Render)

📄 License

This project is licensed under the MIT License.

👤 Author

Rajah (Shanmukha Rajah)
Backend-focused developer exploring Rust for scalable systems.
