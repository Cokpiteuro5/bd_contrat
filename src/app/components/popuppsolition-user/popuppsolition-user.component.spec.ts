import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuppsolitionUserComponent } from './popuppsolition-user.component';

describe('PopuppsolitionUserComponent', () => {
  let component: PopuppsolitionUserComponent;
  let fixture: ComponentFixture<PopuppsolitionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopuppsolitionUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopuppsolitionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
