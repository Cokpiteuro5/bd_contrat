import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDataComponent } from './chart-data.component';

describe('ChartDataComponent', () => {
  let component: ChartDataComponent;
  let fixture: ComponentFixture<ChartDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
