import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { ChatbotComponent } from "./chatbot.component";
import { ChatBodyComponent } from "./chat-body/chat-body.component";
import { ChatInputComponent } from "./chat-input/chat-input.component";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HeaderModule } from "src/app/modules/header/header.module";
import { LoaderComponent } from 'src/app/modules/loader/loader/loader.component';

describe("ChatbotComponent", () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatbotComponent, ChatBodyComponent, ChatInputComponent,LoaderComponent],
      imports: [FormsModule, HttpClientTestingModule, HeaderModule,RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
