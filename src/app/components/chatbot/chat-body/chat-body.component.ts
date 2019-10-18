import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  AfterViewInit
} from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { TextBubbleComponent } from "./text-bubble/text-bubble.component";
import { ConversationService } from 'src/app/services/conversation.service';
import { ChoiceButtonComponent } from './choice-button/choice-button.component';

@Component({
  selector: "app-chat-body",
  templateUrl: "./chat-body.component.html",
  styleUrls: ["./chat-body.component.css"]
})
export class ChatBodyComponent implements OnInit, AfterViewInit{
  @ViewChild("chatContainer", { read: ViewContainerRef, static: false })
  vc: ViewContainerRef;

  constructor(
    private factory: ComponentFactoryResolver,
    private chatService: ChatService,
    private conversationService : ConversationService
  ) {}

  ngOnInit() {
    this.chatService.CreateTextBubble.subscribe(data => {
      this.addTextBubble(data);
    });
    this.chatService.CreateChoiceButton.subscribe(buttonText => {
      this.addChoiceButton(buttonText);
    });
  }

  ngAfterViewInit() {
    //this.chatService.AddTextBubble("Greetings!", "bot");
    //this.chatService.AddTextBubble(" I can help you to book a table in nearby restaurants or I can help you order food to your home. How can I assist?!", "bot");
    this.conversationService.InitiateConversation();
  }


  addTextBubble(data) {
    const factory = this.factory.resolveComponentFactory(TextBubbleComponent);
    const componentRef = this.vc.createComponent(factory);
    let instance = <TextBubbleComponent>componentRef.instance;
    instance.text = data.userText;
    instance.textType = data.textType;
  }

  addChoiceButton(buttonText:string[]) {
    const factory = this.factory.resolveComponentFactory(ChoiceButtonComponent);
    const componentRef1 = this.vc.createComponent(factory);
    let instance1 = <ChoiceButtonComponent>componentRef1.instance;
    instance1.buttonText = buttonText[0];
    const componentRef2 = this.vc.createComponent(factory);
    let instance2 = <ChoiceButtonComponent>componentRef2.instance;
    instance2.buttonText = buttonText[1];
  }
}
