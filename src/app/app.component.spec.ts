import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { HeaderModule } from './modules/header/header.module';
import { ChatBodyComponent } from './components/chatbot/chat-body/chat-body.component';
import { ChatInputComponent } from './components/chatbot/chat-input/chat-input.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoaderComponent } from './modules/loader/loader/loader.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
        HeaderModule
      ],
      declarations: [
        AppComponent,
        ChatbotComponent,
        LoaderComponent,
        ChatBodyComponent,
        ChatInputComponent,
        
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ConciergeBookingApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ConciergeBookingApp');
  });

  
});
