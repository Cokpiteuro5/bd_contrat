import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuppsolitionAdminComponent } from './popuppsolition-admin.component';

describe('PopuppsolitionAdminComponent', () => {
  let component: PopuppsolitionAdminComponent;
  let fixture: ComponentFixture<PopuppsolitionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopuppsolitionAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopuppsolitionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
