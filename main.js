const electron = require('electron')
const singletron = require('./singletron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const defaultEntryURL = path.join(__dirname, 'index.html')

// Multiple windows
let windows = []

function createWindow (entryUrl) {

  const index = windows.length
  const thisWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // For demo purpose: offset windows so they don't overlap exactly
    x: (index+1) * 100,
    y: (index+1) * 100
  })

  windows.push(thisWindow)

  thisWindow.loadURL(url.format({
    pathname: entryUrl || defaultEntryURL,
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  thisWindow.on('closed', function () {
    // Dereference the window object
    windows.splice(index, 1)
  })
}

function startApp() {

  app.on('ready', function() {
    createWindow()
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {
    if (!windows.length) {
      createWindow()
    }
  })
}

// Share single instance of Electron

singletron.createClient().then(({ client, config }) => {

  console.log('Connected to singletron server', config)

  client.on('loaded', () => {

    console.log('App loaded')

    app.quit()
  })

  client.emit('load', defaultEntryURL)

}).catch((e) => {

  // Start app instance
  startApp()

  // Start singletron server

  singletron.createServer().then(({ server, config }) => {

    console.log('Singletron server started', config)

    server.on('load', function(data, socket) {

      console.log('Request for new window', data)

      createWindow(data)

      server.emit(socket, 'loaded')
    })

  }).catch((e) => {
    console.log('Error creating singletron server')
  })
})
