const {app, BrowserWindow, Menu, shell} = require('electron')

const appName = 'Audible'

// https://audible.custhelp.com/app/answers/detail/a_id/7267/~/what-is-an-audible-marketplace-and-which-is-best-for-me%3F

if (app.getLocaleCountryCode() == 'CA') {
  appUrl = 'https://www.audible.ca/library'
  signInUrl = 'https://www.audible.ca/sign-in'
}
else if (app.getLocaleCountryCode() == 'GB' || app.getLocaleCountryCode() == 'IE') {
  appUrl = 'https://www.audible.co.uk/library'
  signInUrl = 'https://www.audible.co.uk/sign-in'
}
else if (app.getLocaleCountryCode() == 'AU' || app.getLocaleCountryCode() == 'NZ') {
  appUrl = 'https://www.audible.com.au/library'
  signInUrl = 'https://www.audible.com.au/sign-in'
}
else if (app.getLocaleCountryCode() == 'FR') {
  appUrl = 'https://www.audible.fr/library'
  signInUrl = 'https://www.audible.fr/sign-in'
}
else if (app.getLocaleCountryCode() == 'DE') {
  appUrl = 'https://www.audible.de/library'
  signInUrl = 'https://www.audible.de/sign-in'
}
else if (app.getLocaleCountryCode() == 'JP') {
  appUrl = 'https://www.audible.co.jp/library'
  signInUrl = 'https://www.audible.co.jp/sign-in'
}
else if (app.getLocaleCountryCode() == 'IT') {
  appUrl = 'https://www.audible.it/library'
  signInUrl = 'https://www.audible.it/sign-in'
}
else if (app.getLocaleCountryCode() == 'IN') {
  appUrl = 'https://www.audible.in/library'
  signInUrl = 'https://www.audible.in/sign-in'
}
else {
  appUrl = 'https://www.audible.com/library'
  signInUrl = 'https://www.audible.com/sign-in'
}

const customCss =
'.topSlot {display: none !important;}' +
'.bottomSlot {display: none !important;}' +
'.bc-button-secondary {display: none !important;}' +
'.bc-size-caption1 {display: none !important;}'

function createWindow () {
  Menu.setApplicationMenu(null)

  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 655,
    title: appName
  })
  mainWindow.loadURL(appUrl + '?ipRedirectOverride=true')

  mainWindow.webContents.on('will-navigate', function(event, url) {
    if (!url.startsWith(appUrl) && !url.startsWith(signInUrl)) {
      event.preventDefault()
      if (mainWindow.webContents.getURL().includes('signin?')) {
        shell.openExternal(url)
      }
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
    if (mainWindow.webContents.getURL().includes('signin?')) {
      shell.openExternal(url)
    }
    else {
      const subWindow = new BrowserWindow({
        width: 450,
        height: 750,
        title: appName
      })
      subWindow.loadURL(url)
  
      subWindow.webContents.on('page-title-updated', function() {
        subWindow.setTitle(appName);
      });
    }
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
