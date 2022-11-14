import WS from 'jest-websocket-mock';
import type { SDKInstance, ServerMessage } from './@types/typings';
import SDK from './sdk';
import { WSServer } from './constants';

describe('SDK', () => {
  const mockedWSUrl = 'ws://localhost:1234/';
  let server: WS;
  let sdkInstance: SDKInstance;

  beforeEach(() => {
    server = new WS(mockedWSUrl);
    sdkInstance = new SDK({ webSocketServer: mockedWSUrl });
  });

  afterEach(() => {
    jest.clearAllMocks();
    WS.clean();
  });

  it('should initialize the sdk', () => {
    expect(sdkInstance).toBeTruthy();
  });

  it('should set a default websocket server', () => {
    sdkInstance.wsClient.on('open', () => {
      expect(sdkInstance.wsClient.url).toEqual(mockedWSUrl);
      const clientWithoutConfig = new SDK();
      expect(clientWithoutConfig.wsClient.url).toEqual(WSServer);
    });
  });

  it('should expose public functions', () => {
    sdkInstance.wsClient.on('open', () => {
      expect(typeof sdkInstance.on).toBe('function');
      expect(typeof sdkInstance.send).toBe('function');
      expect(typeof sdkInstance.disconnect).toBe('function');
    });
  });

  it.each([
    { input: 'bar', output: 'bar' },
    { input: { foo: 'bar' }, output: JSON.stringify({ foo: 'bar' }) },
  ])('should stringify message if not string', async ({ input, output }) => {
    sdkInstance.wsClient.on('open', async () => {
      sdkInstance.send(input);
      await expect(server).toReceiveMessage(output);
      expect(server).toHaveReceivedMessages([output]);
    });
  });

  it('should disconnect', async () => {
    sdkInstance.wsClient.on('open', async () => {
      sdkInstance.disconnect();
      await server.closed;
      expect(sdkInstance.wsClient.readyState).toBe(sdkInstance.wsClient.CLOSED);
    });
  });

  it('should listen for messages', () => {
    sdkInstance.wsClient.on('open', async () => {
      let message: ServerMessage;
      sdkInstance.on('message', (msg) => {
        message = msg;
      });
      server.send('hello everyone');
      expect(message!).toMatchObject({ content: 'hello everyone' });
    });
  });

  it.each([
    { input: 'bar', output: 'bar' },
    { input: JSON.stringify({ foo: 'bar' }), output: { foo: 'bar' } },
  ])('should parse message if not string', ({ input, output }) => {
    sdkInstance.on('message', (msg) => {
      let message: ServerMessage;
      sdkInstance.on('message', (msg) => {
        message = msg;
      });
      server.send(input);
      expect(message!).toMatchObject({ content: output });
    });
  });
});
