use axum::{
    routing::{get, post, put, delete},
    Router,
};

use crate::{
    handlers,
    state::DB,
};

pub fn app_routes(db: DB) -> Router {
    Router::new()
        .route("/items", get(handlers::get_items))
        .route("/items", post(handlers::create_item))
        .route("/items/:id", get(handlers::get_item))
        .route("/items/:id", put(handlers::update_item))
        .route("/items/:id", delete(handlers::delete_item))
        .with_state(db)
}
