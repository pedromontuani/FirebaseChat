import { Component, Input } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'msg-box',
  templateUrl: 'msg-box.html',
  host: {
    '[style.justify-content]': '((!isFromSender) ? "flex-start" : "flex-end")',
    '[style.text-align]': '((!isFromSender) ? "left" : "right")'
  }
})
export class MsgBoxComponent {

  @Input() message: Message;
  @Input() isFromSender: boolean;

  constructor() {

  }

}
