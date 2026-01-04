use axum::{
    extract::{Path, State},
    Json,
};
use uuid::Uuid;

use crate::{
    models::{Item, NewItem},
    state::DB,
};

pub async fn get_items(State(db): State<DB>) -> Json<Vec<Item>> {
    let db = db.lock().unwrap();
    Json(db.values().cloned().collect())
}

use axum::http::StatusCode;

pub async fn get_item(
    Path(id): Path<String>,
    State(db): State<DB>,
) -> Result<Json<Item>, StatusCode> {
    let db = db.lock().unwrap();

    match db.get(&id) {
        Some(item) => Ok(Json(item.clone())),
        None => Err(StatusCode::NOT_FOUND),
    }
}


pub async fn create_item(
    State(db): State<DB>,
    Json(payload): Json<NewItem>,
) -> Json<Item> {
    let item = Item {
        id: Uuid::new_v4().to_string(),
        name: payload.name,
        category: payload.category,
        price: payload.price,
        stock: payload.stock,
    };

    db.lock().unwrap().insert(item.id.clone(), item.clone());
    Json(item)
}

pub async fn update_item(
    Path(id): Path<String>,
    State(db): State<DB>,
    Json(payload): Json<NewItem>,
) -> Result<Json<Item>, StatusCode> {
    let mut db = db.lock().unwrap();

    if !db.contains_key(&id) {
        return Err(StatusCode::NOT_FOUND);
    }

    let item = Item {
        id: id.clone(),
        name: payload.name,
        category: payload.category,
        price: payload.price,
        stock: payload.stock,
    };

    db.insert(id, item.clone());
    Ok(Json(item))
}

pub async fn delete_item(
    Path(id): Path<String>,
    State(db): State<DB>,
) -> Result<Json<Item>, StatusCode> {
    let mut db = db.lock().unwrap();

    match db.remove(&id) {
        Some(item) => Ok(Json(item)),
        None => Err(StatusCode::NOT_FOUND),
    }
}

pub async fn get_items_by_category(
    Path(category): Path<String>,
    State(db): State<DB>,
) -> Json<Vec<Item>> {
    let db = db.lock().unwrap();

    let items: Vec<Item> = db
        .values()
        .cloned()
        .filter(|item| item.category == category)
        .collect();

    Json(items)
}

pub async fn clear_items(State(db): State<DB>) -> StatusCode {
    let mut db = db.lock().unwrap();
    db.clear();
    StatusCode::NO_CONTENT
}
