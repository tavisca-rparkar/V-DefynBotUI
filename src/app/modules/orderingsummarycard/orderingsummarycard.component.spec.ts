import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingsummarycardComponent } from './orderingsummarycard.component';

describe('OrderingsummarycardComponent', () => {
  let component: OrderingsummarycardComponent;
  let fixture: ComponentFixture<OrderingsummarycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderingsummarycardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderingsummarycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
