import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondChartDataComponent } from './second-chart-data.component';

describe('SecondChartDataComponent', () => {
  let component: SecondChartDataComponent;
  let fixture: ComponentFixture<SecondChartDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondChartDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondChartDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
