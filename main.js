const { app, BrowserWindow, Menu } = require('electron/main')

function createWindow () {
  const win = new BrowserWindow()
  const menu = Menu.buildFromTemplate([
    { role: 'copy' },
    { role: 'cut' },
    { role: 'paste' },
    { role: 'Delete' },
    { role: 'Share' }
  ])
  win.webContents.on('context-menu', (_event, params) => {
    // only show the context menu if the element is editable
    if (params.isEditable) {
      menu.popup()
    }
  })
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})