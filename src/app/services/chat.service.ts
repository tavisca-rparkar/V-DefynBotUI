import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  @Output() CreateTextBubble: EventEmitter<any> = new EventEmitter();
  @Output() CreateChoiceButton: EventEmitter<any> = new EventEmitter();

  AddTextBubble(userText: string, sentBy: string) {
    let data = { userText: userText, sentBy: sentBy };
    this.CreateTextBubble.emit(data);
  }

  AddChoiceButton(buttonText: string[]) {
    this.CreateChoiceButton.emit(buttonText);
  }

  updateScroll() {
    var element = document.getElementById("msg-page");
    element.scrollTop = element.scrollHeight;
  }
  constructor() {}
}
