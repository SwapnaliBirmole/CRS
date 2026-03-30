import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPageSidebarComponent } from './chat-page-sidebar.component';

describe('ChatPageSidebarComponent', () => {
  let component: ChatPageSidebarComponent;
  let fixture: ComponentFixture<ChatPageSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatPageSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPageSidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
