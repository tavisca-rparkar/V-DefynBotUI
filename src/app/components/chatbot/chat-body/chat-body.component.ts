import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { TextBubbleComponent } from "./text-bubble/text-bubble.component";

@Component({
  selector: "app-chat-body",
  templateUrl: "./chat-body.component.html",
  styleUrls: ["./chat-body.component.css"]
})
export class ChatBodyComponent implements OnInit {
  @ViewChild("chatContainer", { read: ViewContainerRef, static: false })
  vc: ViewContainerRef;

  constructor(
    private factory: ComponentFactoryResolver,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.chatService.CreateTextBubble.subscribe(data => {
      this.addTextBubble(data);
    });
  }
  addTextBubble(data) {
    const factory = this.factory.resolveComponentFactory(TextBubbleComponent);
    const componentRef = this.vc.createComponent(factory);
    let instance = <TextBubbleComponent>componentRef.instance;
    instance.text = data.userText;
    instance.textType = data.textType;
  }
}
