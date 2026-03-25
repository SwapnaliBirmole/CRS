import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemInfoComponent } from './system-info.component';

describe('SystemInfoComponent', () => {
  let component: SystemInfoComponent;
  let fixture: ComponentFixture<SystemInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SystemInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
