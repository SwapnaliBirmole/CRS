import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCountCardsComponent } from './alert-count-cards.component';

describe('AlertCountCardsComponent', () => {
  let component: AlertCountCardsComponent;
  let fixture: ComponentFixture<AlertCountCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertCountCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertCountCardsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
