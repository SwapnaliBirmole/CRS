import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCardComponent } from './map-card.component';

describe('MapCardComponent', () => {
  let component: MapCardComponent;
  let fixture: ComponentFixture<MapCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
