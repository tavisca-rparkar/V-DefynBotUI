import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";

@Component({
  selector: "app-chatbot",
  templateUrl: "./chatbot.component.html",
  styleUrls: ["./chatbot.component.css"]
})
export class ChatbotComponent implements OnInit {
  constructor(private meta: Meta) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
  }

  ngOnInit() {}
}
