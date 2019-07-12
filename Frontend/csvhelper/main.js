const { app, BrowserWindow } = require('electron');
const electron = require('electron');
var path = require("path");
var url = require("url");


// serve = args.some(function (val) {
//   return val === '--serve';
//
// });
require('electron-reload')(__dirname,{
  electron: path.join(__dirname,'node_modules','.bin','electron'),
  hardResetMethod: 'exit'
});

let win = null;
function createWindow () {
  win = new BrowserWindow({ width: 1300, height: 900 });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );



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
