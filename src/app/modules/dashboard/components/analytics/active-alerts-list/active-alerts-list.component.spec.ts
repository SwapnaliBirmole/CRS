import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAlertsListComponent } from './active-alerts-list.component';

describe('ActiveAlertsListComponent', () => {
  let component: ActiveAlertsListComponent;
  let fixture: ComponentFixture<ActiveAlertsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveAlertsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveAlertsListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
