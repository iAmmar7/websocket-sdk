import { EventEmitter } from 'events';
import WebSocket from 'ws';

export interface SdkConfig {
  webSocketServer?: string;
  logPath?: string;
}

export type ClientMessage = string | Record<string, string>;

export interface ServerMessage {
  id: number;
  content: ClientMessage;
  sentAt: number;
}

export interface SDKInstance {
  listener: EventEmitter;
  wsClient: WebSocket;
  on: (event: string, callback: (msg: ServerMessage) => void) => void;
  send: (msg: ClientMessage) => void;
  disconnect: () => void;
}
