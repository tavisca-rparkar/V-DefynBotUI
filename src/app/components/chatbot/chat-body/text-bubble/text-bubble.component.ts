import { Component, Input, OnInit, AfterViewInit } from "@angular/core";
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: "app-text-bubble",
  templateUrl: "./text-bubble.component.html",
  styleUrls: ["./text-bubble.component.css"]
})
export class TextBubbleComponent implements AfterViewInit {
  @Input() text: string;
  @Input() textType: string;

  constructor(private _chatService : ChatService) {}

  ngAfterViewInit() {
    this._chatService.updateScroll();
  }
}
