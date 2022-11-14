# WebSocket Node SDK

An integrable WebSocket SDK that handles WebSocket client for the server application.

## What it does?
- Exports an SDK class that has three public functions:
  - `on`: Listens for messages from the WebSocket server
  - `send`: Sends a message to the server
  - `disconnect`: Disconnects the client from websocket server
- SDK accepts one optional parameter for configuration
  - `webSocketServer`: WebSocket server URL. By default SDK will connect to [PieSocket](https://www.piesocket.com/websocket-tester) demo server.
  - `logPath`: Path for a log file. By default SDK will create a `log.txt` on the root of your app and will log the Recieved and Send messages there.
- SDK emits a custom event `sdkready` when WebSocket Client successfully connects with the WebSocket Server.

For integration example, see the [node-simulator](https://github.com/iAmmar7/websocket-sdk/tree/main/apps/node-simulator) applciation.

## How to run?

Create a build

```
cd websocket-sdk
cd apps/node-sdk
npm run build
```

The build will create a `dist` folder to export the SDK class and types file for typescript.

To use this SDK run,
```
npm run dev
```

If you are USING THIS SDK WITHIN THE MONOREPO, include this as a dependency in the package.json of any other application,
```json
{ 
  "dependencies": {
    "@websocket/node-sdk": "*",
  }
}
```

See the [example](https://github.com/iAmmar7/websocket-sdk/blob/main/apps/node-simulator/package.json#L19) with `node-simulator` app.

If you are NOT USING THIS SDK WITHIN THE MONOREPO, then you can include the SDK as a file,
```json
{ 
  "dependencies": {
    "@websocket/browser-sdk": "file: ../path/to/sdk",
  }
}
```
