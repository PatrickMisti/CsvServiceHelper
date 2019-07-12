const { app, BrowserWindow } = require('electron');
const electron = require('electron');

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

let win = null;
function createWindow () {
  win = new BrowserWindow({ width: 1200, height: 800 });

  win.loadFile(`./dist/csvhelper/index.html`);
  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow);









app.on('window-all-closed', () => {
// On macOS it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
app.on('activate', () => {
// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
});
