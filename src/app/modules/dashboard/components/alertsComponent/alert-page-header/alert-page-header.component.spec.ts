import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPageHeaderComponent } from './alert-page-header.component';

describe('AlertPageHeaderComponent', () => {
  let component: AlertPageHeaderComponent;
  let fixture: ComponentFixture<AlertPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertPageHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertPageHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
