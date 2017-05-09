
# Singletron example

Minimal example of sharing a single instance of Electron

## See it in action

```bash
# Clone this repository
git clone https://github.com/eliot-akira/singletron-example
# Go into the repository
cd singletron-example
# Install dependencies
npm install
# Run the app
npm start
```

This starts an instance of the app, and listens for inter-process requests from other apps.

Then, in another terminal window, start a second instance.

```bash
npm start
```

It will connect with the first instance, and hand over the rest of the launch process by requesting a new window.
