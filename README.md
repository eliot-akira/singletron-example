
# Singletron example

Minimal example of sharing a single instance of Electron

## Why?

A common complaint about Electron is that each app instance takes up significant (100MB~) memory. There is [an on-going discussion in the Electron repo](https://github.com/electron/electron/issues/673) about how to share a runtime among apps. This is an attempt at addressing the issue.

Please note that it is just a proof-of-concept, and not meant for production use.

## See it in action

```bash
git clone https://github.com/eliot-akira/singletron-example
cd singletron-example
npm install
npm start
```

This starts an instance of the app, and listens for inter-process requests from other apps.

Then, in another terminal window, start more instances.

```bash
npm start
npm start
npm start
```

They will connect with the first instance, and hand over the rest of the launch process by requesting new windows.

## How does it work?

It uses `node-ipc` to communicate and negotiate between server/clients. The IPC hub is a separate module called [`singletron`](https://github.com/eliot-akira/singletron). For the initialization step, see the bottom of [`main.js`](https://github.com/eliot-akira/singletron-example/blob/master/main.js#L55).
