import type { ClientMessage, SdkConfig, ServerMessage } from './@types/typings';
import { WSServer } from './constants';
import { isJson } from './utils';

/**
 * The browser SDK instance
 */
class Sdk {
  private readonly wsServer: string;
  private readonly socket: WebSocket;
  private renderIn: HTMLElement;

  constructor(private readonly sdkConfig?: SdkConfig) {
    const ul = document.createElement('ul');
    this.renderIn = this.sdkConfig?.renderIn ?? document.body.appendChild(ul);
    this.wsServer = this.sdkConfig?.webSocketServer ?? WSServer;

    this.socket = new WebSocket(this.wsServer);
    this.initSocket();
  }

  get wsClient() {
    return this.socket;
  }

  private initSocket() {
    // Connection opened
    this.socket.addEventListener('open', (event) => {
      window.dispatchEvent(new CustomEvent('sdkready'));
    });

    // Listen for errors
    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket error encountered', event);
    });

    // Listen for close
    this.socket.addEventListener('close', (event: CloseEvent) => {
      console.info('WebSocket connection closed', event);
    });
  }

  public on(eventName: string, callback: (message: ServerMessage) => void) {
    this.socket.addEventListener(eventName, (event) => {
      const id = Date.now();
      const data = (event as MessageEvent).data;

      const newLi = document.createElement('li');
      newLi.setAttribute('id', id.toString());
      newLi.appendChild(document.createTextNode(`RECV: ${data}`));
      this.renderIn.appendChild(newLi);

      const newEvent: ServerMessage = {
        id,
        content: isJson(data) ? JSON.parse(data) : data,
        sentAt: event.timeStamp,
      };
      callback(newEvent);
    });
  }

  public send(msg: ClientMessage) {
    const id = Date.now();
    const data = typeof msg === 'string' ? msg : JSON.stringify(msg);

    const newLi = document.createElement('li');
    newLi.setAttribute('id', id.toString());
    newLi.appendChild(document.createTextNode(`SEND: ${data}`));
    this.renderIn.appendChild(newLi);

    this.socket.send(data);
  }

  public disconnect(code?: number, reason?: string) {
    this.socket.close(code, reason);
  }
}

export default Sdk;
