const ipc = require('node-ipc')

module.exports = function createServer(options = {}) {

  const serverId = options.serverId || 'singletronServer'

  return new Promise((resolve, reject) => {

    try {

      ipc.config.id = serverId
      ipc.config.maxRetries = 0
      ipc.config.silent = true

      ipc.serve(function() {

        const server = ipc.server

        const config = {
          id: ipc.config.id,
          pid: process.pid,
          versions: {
            node: process.versions.node,
            chrome: process.versions.chrome,
            electron: process.versions.electron
          }
        }

        server.on('handshakeRequest', function(data, socket) {
          server.emit(socket, 'handshakeResponse', config)
        })

        resolve({ server, config })
      })

      ipc.server.start()

    } catch (e) {
      reject(e)
    }
  })

}