import { ClientSDK } from '@websocket/node-sdk';

const sdk = new ClientSDK({ logPath: './log/logger.txt' });

sdk.listener.on('sdkready', () => {
  console.log('SDK is ready');
});

sdk.on('message', (message) => {
  console.log('Received', message.id, message.content, message.sentAt);
});

const interval = setInterval(() => {
  sdk.send({
    foo: 'bar',
  });
}, 5000);

setTimeout(() => {
  sdk.disconnect();
  clearInterval(interval);
}, 20000);
