import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictDetailsComponent } from './district-details.component';

describe('DistrictDetailsComponent', () => {
  let component: DistrictDetailsComponent;
  let fixture: ComponentFixture<DistrictDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DistrictDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
