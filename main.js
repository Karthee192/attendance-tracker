// main.js
// This is the "brain" of Electron. It creates the desktop window.

const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      // webSecurity: false allows our app to load Firebase from the internet
      // while running as a local desktop app. This is safe for a personal app.
      webSecurity: false
    },
    backgroundColor: '#0f172a', // Dark background while loading
    show: false,                 // Don't show until fully loaded (no white flash)
    title: 'Attendance Tracker'
  });

  // Load the login page first
  mainWindow.loadFile('src/login.html');

  // Show the window only after it's fully ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // --- UNCOMMENT the line below when debugging errors ---
   mainWindow.webContents.openDevTools();
}

// When Electron is ready, create the window
app.whenReady().then(() => {
  createWindow();

  // macOS: re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});