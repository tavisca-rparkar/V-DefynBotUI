import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  @Output() CreateTextBubble: EventEmitter<any> = new EventEmitter();

  AddTextBubble(userText: string, textType: string) {
    let data = { userText: userText, textType: textType };
    this.CreateTextBubble.emit(data);
  }

  updateScroll() {
    var element = document.getElementById("msg-page");
    element.scrollTop = element.scrollHeight;
  }
  constructor() {}
}
