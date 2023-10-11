import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpBtnComponent } from './help-btn.component';

describe('HelpBtnComponent', () => {
  let component: HelpBtnComponent;
  let fixture: ComponentFixture<HelpBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpBtnComponent]
    });
    fixture = TestBed.createComponent(HelpBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
