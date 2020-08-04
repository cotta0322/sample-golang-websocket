import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChatMessageService } from './service/chat-message/chat-message.service';

interface DispChatDataModel {
  isMyself: boolean;
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('dispArea') dispArea: ElementRef;

  messageData: DispChatDataModel[] = [];

  constructor(private chatMessageService: ChatMessageService) {}

  ngOnInit() {
    this.chatMessageService.connect().subscribe((response) => {
      this.messageData.push({
        message: response.message,
        isMyself: response.isMyself,
      });
    });
  }

  ngAfterViewChecked() {
    this.dispAreaToBottom();
  }

  submit(message: string) {
    this.chatMessageService.request({ message });
  }

  private dispAreaToBottom() {
    this.dispArea.nativeElement.scrollTop = this.dispArea.nativeElement.scrollHeight;
  }
}
