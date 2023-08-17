import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupprojectComponent } from './popupproject.component';

describe('PopupprojectComponent', () => {
  let component: PopupprojectComponent;
  let fixture: ComponentFixture<PopupprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
