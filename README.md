# WebSocket SDKs

WebSocket Client SDK for both Browser/Web and Node JS.

## What's inside?

This monorepo is built with [Turbo](https://turbo.build/repo). It includes the following apps and packages:

### Apps

- `browser-sdk`: an integrable SDK for Web application - [More details](https://github.com/iAmmar7/websocket-sdk/tree/main/apps/browser-sdk)
- `node-sdk`: an integrable SDK for Node application - [More details](https://github.com/iAmmar7/websocket-sdk/tree/main/apps/node-sdk)
- `browser-simulator`: a simulator app to see the browser-sdk in action - [More details](https://github.com/iAmmar7/websocket-sdk/tree/main/apps/browser-simulator)
- `node-simulator`: a simulator app to see the node-sdk in action - [More details](https://github.com/iAmmar7/websocket-sdk/tree/main/apps/node-simulator)

### Packages
- `eslint-config`: `eslint` configurations (includes `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `utils`: a utility package shared by both `node-sdk` and `browser-sdk`

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

Both SDKs and a Utility package is bundled with [Vite](https://vitejs.dev/).

Both SDKs are being used as an external package in their respective simulator. These SDKs can be published to [NPM](https://www.npmjs.com/).

## How to run?

### 1. Install
To install dependencies for all apps and packages, run the following command:

```
cd websocket-sdk
npm install
```

### 2. Build

To build all apps and packages, run the following command:

```
cd websocket-sdk
npm run build
```

### 3. Run

To develop all apps and packages, run the following command:

```
cd websocket-sdk
npm run dev
```

### 4. Observe

Open port 3001 in the browser to see the `browser-simulator`. This simulator is using a `browser-sdk` as an external package.

Similarly, `node-sdk` is integrated as an external package in the `node-simulator`.

## Unit test
Jest is being used in both of SDKs for unit testing.

To run the test
```
cd websocket-sdk
npm run test
```

To see the test coverage
```
cd websocket-sdk
npm run coverage
```

## Technologies

Tools and technologies used in this project

- [Turborepp](https://turbo.build/repo)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Node JS](https://nodejs.org)
- [JEST](https://jestjs.io)
