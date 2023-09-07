import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsMajourComponent } from './budgets-majour.component';

describe('BudgetsMajourComponent', () => {
  let component: BudgetsMajourComponent;
  let fixture: ComponentFixture<BudgetsMajourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetsMajourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetsMajourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
