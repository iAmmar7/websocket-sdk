import { ClientSDK } from '@websocket/browser-sdk';

const status = document.getElementById('status')!;
const disconnect = document.getElementById('disconnect')!;
const form = document.getElementById('form')!;
const input = document.getElementById('message')!;

const sdk = new ClientSDK({
  webSocketServer:
    'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
  renderIn: document.getElementById('list')!,
});

sdk.on('message', (message) => {
  console.log('Received', message.id, message.content, message.sentAt);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  const message = formData.get('message') as string;

  if (!message || message.trim().length < 1) return;

  (input as HTMLInputElement).value = '';

  sdk.send(message);
});

window.addEventListener('sdkready', () => {
  status.style['color'] = '#14BE44';
  status.innerText = 'Connected';
});

disconnect.addEventListener('click', () => {
  sdk.disconnect();
  status.style['color'] = '#b91c1b';
  status.innerText = 'Disconnected';
});
