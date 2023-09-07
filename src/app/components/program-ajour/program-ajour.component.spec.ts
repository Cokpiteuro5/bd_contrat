import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramAjourComponent } from './program-ajour.component';

describe('ProgramAjourComponent', () => {
  let component: ProgramAjourComponent;
  let fixture: ComponentFixture<ProgramAjourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramAjourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramAjourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
