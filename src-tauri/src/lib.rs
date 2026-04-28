use engine::Session;
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![new_session, open_session])
        .manage(SessionState(Mutex::new(None)))
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
