import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";

@Component({
  selector: "app-text-bubble",
  templateUrl: "./text-bubble.component.html",
  styleUrls: ["./text-bubble.component.css"]
})
export class TextBubbleComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.chatService.updateScroll();
  }
  @Input() text: string;
  @Input() textType: string;

  constructor(private chatService: ChatService) {}

  ngOnInit() {}
}
