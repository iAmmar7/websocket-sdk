import WS from 'jest-websocket-mock';
import SDK from './sdk';
import { WSServer } from './constants';
import { ServerMessage } from './@types/typings';

describe('SDK', () => {
  const mockedWSUrl = 'ws://localhost:1234/';
  let server: WS;
  let sdkInstance: SDK;

  beforeEach(() => {
    server = new WS(mockedWSUrl);
    sdkInstance = new SDK({ webSocketServer: mockedWSUrl });
  });

  afterEach(() => {
    jest.clearAllMocks();
    WS.clean();
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  it('should initialize the sdk', () => {
    expect(sdkInstance).toBeTruthy();
  });

  it('should set a default websocket server', () => {
    expect(sdkInstance.wsClient.url).toEqual(mockedWSUrl);
    const clientWithoutConfig = new SDK();
    expect(clientWithoutConfig.wsClient.url).toEqual(WSServer);
  });

  it('should expose public functions', () => {
    expect(typeof sdkInstance.on).toBe('function');
    expect(typeof sdkInstance.send).toBe('function');
    expect(typeof sdkInstance.disconnect).toBe('function');
  });

  it('should send a message to server', async () => {
    sdkInstance.send('hello');
    await expect(server).toReceiveMessage('hello');
    expect(server).toHaveReceivedMessages(['hello']);
  });

  it.each([
    { input: 'bar', output: 'bar' },
    { input: { foo: 'bar' }, output: JSON.stringify({ foo: 'bar' }) },
  ])('should stringify message if not string', async ({ input, output }) => {
    await server.connected;
    sdkInstance.send(input);
    await expect(server).toReceiveMessage(output);
    expect(server).toHaveReceivedMessages([output]);
  });

  it('should disconnect', async () => {
    sdkInstance.disconnect();
    await server.closed;
    expect(sdkInstance.wsClient.readyState).toBe(WebSocket.CLOSED);
  });

  it('should listen for messages', () => {
    let message: ServerMessage;
    sdkInstance.on('message', (msg) => {
      message = msg;
    });
    server.send('hello everyone');
    expect(message!).toMatchObject({ content: 'hello everyone' });
  });

  it.each([
    { input: 'bar', output: 'bar' },
    { input: JSON.stringify({ foo: 'bar' }), output: { foo: 'bar' } },
  ])('should parse message if not string', ({ input, output }) => {
    let message: ServerMessage;
    sdkInstance.on('message', (msg) => {
      message = msg;
    });
    server.send(input);
    expect(message!).toMatchObject({ content: output });
  });

  it('should render the list on DOM', () => {
    sdkInstance.send('foo');
    sdkInstance.send('bar');
    sdkInstance.send({ foor: 'bar' });
    sdkInstance.on('message', (msg) => {});
    server.send('hello everyone');
    expect(document.body.getElementsByTagName('li')).toHaveLength(4);
  });

  it('should dispatch a custom event', () => {
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');
    server.on('connection', () => {
      expect(dispatchEventSpy).toHaveBeenCalledWith({ type: 'sdkready' });
    });
    dispatchEventSpy.mockClear();
  });
});
