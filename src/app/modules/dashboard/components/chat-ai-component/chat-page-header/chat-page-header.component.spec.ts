import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPageHeaderComponent } from './chat-page-header.component';

describe('ChatPageHeaderComponent', () => {
  let component: ChatPageHeaderComponent;
  let fixture: ComponentFixture<ChatPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatPageHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPageHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
