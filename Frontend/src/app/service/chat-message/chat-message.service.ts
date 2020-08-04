import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ChatMessageRequestModel } from './chat-message-request.model';
import { ChatMessageResponseModel } from './chat-message-response.model';

@Injectable()
export class ChatMessageService {
  private readonly URL = 'ws://' + window.location.host + '/api/chat';

  private socket: WebSocketSubject<any>;

  connect(): Observable<ChatMessageResponseModel> {
    if (!this.socket) {
      this.socket = webSocket<any>(this.URL);
    }
    return this.socket.asObservable();
  }

  request(value: ChatMessageRequestModel) {
    this.socket.next(value);
  }
}
