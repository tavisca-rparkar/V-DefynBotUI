import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBodyComponent } from './chat-body.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChatBodyComponent', () => {
  let component: ChatBodyComponent;
  let fixture: ComponentFixture<ChatBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBodyComponent ],
      imports: [FormsModule,HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

