import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftComponent } from './weather.component';

describe('NftComponent', () => {
  let component: NftComponent;
  let fixture: ComponentFixture<NftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [NftComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
