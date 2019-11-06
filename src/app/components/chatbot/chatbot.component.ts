import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: "app-chatbot",
  templateUrl: "./chatbot.component.html",
  styleUrls: ["./chatbot.component.css"]
})
export class ChatbotComponent implements OnInit {
  constructor( public _stateService: StateService,private meta: Meta) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
  }

  ngOnInit() {}
}
