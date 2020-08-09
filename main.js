const { app, BrowserWindow } = require('electron');
require('./bin/www');

function createWindow() {
    let win = new BrowserWindow ({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // win.loadFile('index.html');
    win.loadURL("http://localhost:5000")
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});