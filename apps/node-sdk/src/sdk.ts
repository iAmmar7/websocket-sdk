import fs from 'fs';
import WebSocket from 'ws';
import { EventEmitter } from 'events';

import type { SdkConfig, ServerMessage, ClientMessage, SDKInstance } from './@types/typings';
import { WSServer } from './constants';

/**
 * The Node SDK instance
 */
class Sdk implements SDKInstance {
  private readonly wsServer: string;
  private readonly socket: WebSocket;
  private readonly emitter: EventEmitter;
  private readonly filePath: string;

  constructor(private readonly sdkConfig?: SdkConfig) {
    this.wsServer = this.sdkConfig?.webSocketServer ?? WSServer;
    this.filePath = this.sdkConfig?.logPath ?? './log.txt';

    this.socket = new WebSocket(this.wsServer);
    this.emitter = new EventEmitter();

    this.initSocket();
  }

  get wsClient() {
    return this.socket;
  }

  get listener() {
    return this.emitter;
  }

  private initSocket() {
    // Connection opened
    this.socket.on('open', () => {
      this.emitter.emit('sdkready');
    });

    // Listen for errors
    this.socket.addEventListener('error', (event) => {
      console.error('WebSocket error encountered', event);
    });

    // Listen for close
    this.socket.on('close', (event) => {
      console.info('WebSocket connection closed', event);
    });
  }

  private logger(message: string) {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, `${message}\n`);
      return;
    }
    fs.appendFileSync(this.filePath, `${message}\n`);
  }

  public on(eventName: string, callback: (message: ServerMessage) => void) {
    this.socket.on(eventName, (data, isBinary) => {
      const message = isBinary ? data : data.toString();
      const id = Date.now();
      const newEvent: ServerMessage = {
        id,
        content: message,
        sentAt: id,
      };
      this.logger(`RECV: ${message}`);
      callback(newEvent);
    });
  }

  public send(msg: ClientMessage) {
    const message = typeof msg === 'string' ? msg : JSON.stringify(msg);
    this.logger(`SEND: ${message}`);
    this.socket.send(message);
  }

  public disconnect(code?: number, reason?: string) {
    this.socket.close(code, reason);
  }
}

export default Sdk;
