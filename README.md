# desktop

## Building from source

### Prerequisites

You will need the following softwares for the build sequence

* **Node.js runtime**
* **npm package manager**
* **Rust toolchain**

### Steps

* **Clone this repository:**  
`git clone https://github.com/PraesidiumApp/desktop.git`
`git checkout latest`  
`cd desktop/`
* **Install NPM dependencies:**  
`npm ci`
* **Install Cargo dependencies:**  
`cd src-tauri/`  
`cargo fetch --locked`
* **Build the app:**  
`npm run tauri build --no-bundle`  
`cp src-tauri/target/release/praesidium-desktop ~`
* **Your app is ready to use in your home directory**

### Tested with

This build procedure has been tested with the following versions (but not limited to):

* **Node.js:** `v20.19.2 (Debian 13)`
* **npm**: `v9.2.0`
* **Rust toolchain**: `stable-x86_64-unknown-linux-gnu`
	* **rustc:** `rustc 1.95.0 (59807616e 2026-04-14)`
	* **cargo:** `cargo 1.95.0 (f2d3ce0bd 2026-03-21)`
