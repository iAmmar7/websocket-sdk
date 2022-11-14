# WebSocket Browser SDK

An integrable WebSocket SDK that handles WebSocket client for the web application.

## What it does?
- Exports an SDK class that has three public functions:
  - `on`: Listens for messages from the WebSocket server
  - `send`: Sends a message to the server
  - `disconnect`: Disconnects the client from websocket server
- SDK accepts one optional parameter for configuration
  - `webSocketServer`: WebSocket server URL. By default it will connect to [PieSocket](https://www.piesocket.com/websocket-tester) demo server.
  - `renderIn`: HTML DOM Element to render the list. By default SDK will renders the Recieved and Send messages on the Document Body element.
- SDK emits a custom event `sdkready` when Client successfully connects with the Server.

## How to run?

Create a build

```
cd websocket-sdk
cd apps/browser-sdk
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
    "@websocket/browser-sdk": "*",
  }
}
```

See the [example](https://github.com/iAmmar7/websocket-sdk/blob/main/apps/browser-simulator/package.json#L13) with `browser-simulator` app.

If you are NOT USING THIS SDK WITHIN THE MONOREPO, then you can include the SDK as a file,
```json
{ 
  "dependencies": {
    "@websocket/browser-sdk": "file: ../path/to/sdk",
  }
}
```
