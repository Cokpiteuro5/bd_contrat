import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthChartDataComponent } from './fourth-chart-data.component';

describe('FourthChartDataComponent', () => {
  let component: FourthChartDataComponent;
  let fixture: ComponentFixture<FourthChartDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourthChartDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthChartDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
