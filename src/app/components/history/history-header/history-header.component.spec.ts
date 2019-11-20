import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryHeaderComponent } from './history-header.component';

describe('HistoryHeaderComponent', () => {
  let component: HistoryHeaderComponent;
  let fixture: ComponentFixture<HistoryHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
