import {
  Component,
  AfterViewInit,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver
} from "@angular/core";
import { TextBubbleComponent } from './text-bubble/text-bubble.component';
import { ChoiceButtonComponent } from './choice-button/choice-button.component';
import { ChatService } from 'src/app/services/chat.service';
import { ConversationService } from 'src/app/services/conversation.service';


@Component({
  selector: "app-chat-body",
  templateUrl: "./chat-body.component.html",
  styleUrls: ["./chat-body.component.css"]
})
export class ChatBodyComponent implements OnInit,AfterViewInit{
  ngOnInit() {
    this._chatService.createTextBubble$
    .subscribe(
      data => {
          this.addTextBubble(data);
      }
    );
    this._chatService.createChoiceButton$
    .subscribe(
      data => {
          this.addChoiceButton(data);
      }
    );
  }

  @ViewChild("chatContainer", { read: ViewContainerRef, static: false })
  vc: ViewContainerRef;
  
  constructor(
    private _conversationService : ConversationService,
    private factory: ComponentFactoryResolver,
    private _chatService : ChatService
  ) {}

  ngAfterViewInit() {
    // initiating conversation for default welcome message-
    this._conversationService.InitiateConversation();
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