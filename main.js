const {app, BrowserWindow, Menu} = require('electron')

const appName = 'Audible'

const appUrl = 'https://www.audible.co.uk/library'

const customCss = '#top-1 {display: none !important;}' +
'#bottom-1 {display: none !important;}' +
'.bc-button-secondary {display: none !important;}' +
'.bc-size-caption1 {display: none !important;}'

function createWindow () {
  Menu.setApplicationMenu(null)

  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 655,
    title: appName
  })
  mainWindow.loadURL(appUrl)

  mainWindow.webContents.on('will-navigate', function(event, url) {
    if (!url.startsWith(appUrl)) {
      event.preventDefault()
    }
  });

  mainWindow.webContents.on('did-navigate', function() {
    mainWindow.webContents.insertCSS(customCss)
  });

  mainWindow.webContents.on('page-title-updated', function() {
    mainWindow.webContents.insertCSS(customCss)
    mainWindow.setTitle(appName);
  });

  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
    event.preventDefault()
    const subWindow = new BrowserWindow({
      title: appName
    })
    subWindow.loadURL(url)

    subWindow.webContents.on('page-title-updated', function() {
      subWindow.setTitle(appName);
    });
  })
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
