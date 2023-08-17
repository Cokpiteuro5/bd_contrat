import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartComponent } from './add-depart.component';

describe('AddDepartComponent', () => {
  let component: AddDepartComponent;
  let fixture: ComponentFixture<AddDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDepartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
