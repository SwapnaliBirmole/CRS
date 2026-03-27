import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMultiChannelComponent } from './alert-multi-channel.component';

describe('AlertMultiChannelComponent', () => {
  let component: AlertMultiChannelComponent;
  let fixture: ComponentFixture<AlertMultiChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertMultiChannelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertMultiChannelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
