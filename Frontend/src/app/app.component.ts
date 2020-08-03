import { Component, ViewChild, ElementRef } from '@angular/core';

interface ChatDataType {
  user: 'other' | 'myself';
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('dispArea') dispArea: ElementRef;

  SAMPLE_DATA: ChatDataType[] = [
    { user: 'other', message: 'サンプルメッセージ' },
    { user: 'myself', message: 'サンプルメッセージ\nサンプルデータ' },
    { user: 'other', message: 'サンプルメッセージ' },
    { user: 'myself', message: 'サンプルメッセージ' },
    { user: 'other', message: 'サンプルメッセージ' },
  ];

  messageData = this.SAMPLE_DATA;

  submit(message: string) {
    this.messageData.push({
      user: 'myself',
      message,
    });
  }

  ngAfterViewChecked() {
    this.dispAreaToBottom();
  }

  dispAreaToBottom() {
    this.dispArea.nativeElement.scrollTop = this.dispArea.nativeElement.scrollHeight;
  }
}
