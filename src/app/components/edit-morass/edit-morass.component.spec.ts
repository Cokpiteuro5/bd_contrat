import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMorassComponent } from './edit-morass.component';

describe('EditMorassComponent', () => {
  let component: EditMorassComponent;
  let fixture: ComponentFixture<EditMorassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMorassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMorassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
