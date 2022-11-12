export interface SdkConfig {
  webSocketServer?: string;
  renderIn?: HTMLElement;
}

export type ClientMessage = string | Record<string, string>;

export interface ServerMessage {
  id: number;
  content: ClientMessage;
  sentAt: number;
}

export interface SDKInstance {
  on: (event: string, callback: (msg: ServerMessage) => void) => void;
  send: (msg: ClientMessage) => void;
  disconnect: () => void;
}

declare global {
  interface Window {
    ClientSDK: (config: SdkConfig) => SDKInstance;
  }
}
