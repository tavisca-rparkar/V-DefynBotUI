import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderingHistoryComponent } from './ordering-history.component';

describe('OrderingHistoryComponent', () => {
  let component: OrderingHistoryComponent;
  let fixture: ComponentFixture<OrderingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
