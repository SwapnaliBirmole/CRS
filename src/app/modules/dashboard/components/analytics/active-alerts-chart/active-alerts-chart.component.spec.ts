import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAlertsChartComponent } from './active-alerts-chart.component';

describe('ActiveAlertsChartComponent', () => {
  let component: ActiveAlertsChartComponent;
  let fixture: ComponentFixture<ActiveAlertsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveAlertsChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveAlertsChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
