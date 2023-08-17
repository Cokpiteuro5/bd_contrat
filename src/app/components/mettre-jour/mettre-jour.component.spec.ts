import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MettreJourComponent } from './mettre-jour.component';

describe('MettreJourComponent', () => {
  let component: MettreJourComponent;
  let fixture: ComponentFixture<MettreJourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MettreJourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MettreJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
