import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaMomentoComponent } from './venta-momento.component';

describe('VentaMomentoComponent', () => {
  let component: VentaMomentoComponent;
  let fixture: ComponentFixture<VentaMomentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaMomentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaMomentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
