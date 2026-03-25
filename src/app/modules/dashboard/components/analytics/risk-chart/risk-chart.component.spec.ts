import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskChartComponent } from './risk-chart.component';

describe('RiskChartComponent', () => {
  let component: RiskChartComponent;
  let fixture: ComponentFixture<RiskChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RiskChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
