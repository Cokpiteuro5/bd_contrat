import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOddComponent } from './list-odd.component';

describe('ListOddComponent', () => {
  let component: ListOddComponent;
  let fixture: ComponentFixture<ListOddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
