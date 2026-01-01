use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Item {
    pub id: String,
    pub name: String,
    pub category: String,
    pub price: u32,
    pub stock: u32,
}

#[derive(Deserialize)]
pub struct NewItem {
    pub name: String,
    pub category: String,
    pub price: u32,
    pub stock: u32,
}
