import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMorassComponent } from './add-morass.component';

describe('AddMorassComponent', () => {
  let component: AddMorassComponent;
  let fixture: ComponentFixture<AddMorassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMorassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMorassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
