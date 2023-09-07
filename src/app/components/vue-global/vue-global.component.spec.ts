import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueGlobalComponent } from './vue-global.component';

describe('VueGlobalComponent', () => {
  let component: VueGlobalComponent;
  let fixture: ComponentFixture<VueGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VueGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VueGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
