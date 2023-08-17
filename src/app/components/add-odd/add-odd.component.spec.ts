import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOddComponent } from './add-odd.component';

describe('AddOddComponent', () => {
  let component: AddOddComponent;
  let fixture: ComponentFixture<AddOddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
