use std::{collections::HashMap, sync::{Arc, Mutex}};
use crate::models::Item;

pub type DB = Arc<Mutex<HashMap<String, Item>>>;

pub fn init_db() -> DB {
    Arc::new(Mutex::new(HashMap::new()))
}
