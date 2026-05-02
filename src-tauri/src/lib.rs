use engine::{Session, SessionItem};
use std::sync::Mutex;
use tauri::State;

// Wrapper struct around engine's Session, Mutexed because of Tauri's requirements
struct SessionState(Mutex<Option<Session>>);

#[tauri::command]
async fn new_session(
    path: String,
    mut password: String,
    state: State<'_, SessionState>,
) -> Result<(), String> {
    let mut lock = state.0.lock().map_err(|e| e.to_string())?;

    if lock.is_some() {
        return Err("A session is already active!".to_string());
    }

    *lock = Some(Session::new(path, password.as_mut_str()).map_err(|e| e.to_string())?);

    Ok(())
}

#[tauri::command]
async fn open_session(
    path: String,
    mut password: String,
    state: State<'_, SessionState>
) -> Result<(), String> {
    let mut lock = state.0.lock().map_err(|e| e.to_string())?;

    if lock.is_some() {
        return Err("A session is already active!".to_string());
    }

    *lock = Some(Session::open(path, password.as_mut_str()).map_err(|e| e.to_string())?);

    Ok(())
}

#[tauri::command]
async fn close(state: State<'_, SessionState>) -> Result<(), String> {
    let mut lock = state.0.lock().map_err(|e| e.to_string())?;

    // Drop the Session, safely closing it
    *lock = None;

    Ok(())
}

#[tauri::command]
async fn get_items(state: State<'_, SessionState>) -> Result<Vec<SessionItem>, String> {
    let mut lock = state.0.lock().map_err(|e| e.to_string())?;

    let session = lock.as_mut().ok_or("No active session!".to_string())?;

    SessionItem::scan_and_fill(&session.connection, &session.master_key, &mut session.items).map_err(|e| e.to_string())?;

    let mut items = session.items.clone();
    // Remove the canary for the frontend (guaranteed to be index 0)
    items.retain(|item| item.id != 0);

    Ok(items)
}

#[tauri::command]
async fn exists(state: State<'_, SessionState>, id: i64) -> Result<bool, String> {
    let lock = state.0.lock().map_err(|e| e.to_string())?;

    let session = lock.as_ref().ok_or("No active session!".to_string())?;

    Ok(SessionItem::exists(&session.connection, id).map_err(|e| e.to_string())?)
}

#[tauri::command]
async fn save_item(state: State<'_, SessionState>, mut new_item: SessionItem) -> Result<(), String> {
    let mut lock = state.0.lock().map_err(|e| e.to_string())?;

    let session = lock.as_mut().ok_or("No active session!".to_string())?;

    SessionItem::save(&session.connection, &session.master_key, new_item.id, &new_item.label, &new_item.kind, &mut new_item.payload).map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
async fn drop_item(state: State<'_, SessionState>, id: i64) -> Result<(), String> {
    let mut lock = state.0.lock().map_err(|e| e.to_string())?;

    let session = lock.as_mut().ok_or("No active session!".to_string())?;

    SessionItem::drop(&session.connection, id).map_err(|e| e.to_string())?;

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![new_session, open_session, close, get_items, exists, save_item, drop_item])
        .manage(SessionState(Mutex::new(None)))
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
