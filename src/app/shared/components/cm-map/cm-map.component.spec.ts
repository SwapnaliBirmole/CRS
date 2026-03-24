import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmMapComponent } from './cm-map.component';

describe('CmMapComponent', () => {
  let component: CmMapComponent;
  let fixture: ComponentFixture<CmMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmMapComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
