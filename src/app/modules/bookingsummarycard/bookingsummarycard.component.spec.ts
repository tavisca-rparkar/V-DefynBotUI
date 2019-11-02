import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsummarycardComponent } from './bookingsummarycard.component';

describe('BookingsummarycardComponent', () => {
  let component: BookingsummarycardComponent;
  let fixture: ComponentFixture<BookingsummarycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingsummarycardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsummarycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
