const {app, BrowserWindow, Menu} = require('electron')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 655,
  })

  mainWindow.loadURL('https://www.audible.co.uk/library')
  Menu.setApplicationMenu(null)
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
