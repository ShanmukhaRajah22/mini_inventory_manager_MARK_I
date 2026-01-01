mod models;
mod state;
mod handlers;
mod routes;

use tower_http::cors::CorsLayer;

#[tokio::main]
async fn main() {
    let db = state::init_db();

    let app = routes::app_routes(db)
        .layer(CorsLayer::permissive());

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();

    axum::serve(listener, app.into_make_service())
        .await
        .unwrap();
}
