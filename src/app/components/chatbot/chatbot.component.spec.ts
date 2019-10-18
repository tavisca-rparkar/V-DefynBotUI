import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotComponent } from './chatbot.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatBodyComponent } from './chat-body/chat-body.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotComponent,ChatHeaderComponent,ChatBodyComponent,ChatInputComponent],
      imports:[FormsModule,HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
