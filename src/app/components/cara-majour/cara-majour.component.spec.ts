import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaraMajourComponent } from './cara-majour.component';

describe('CaraMajourComponent', () => {
  let component: CaraMajourComponent;
  let fixture: ComponentFixture<CaraMajourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaraMajourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaraMajourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
