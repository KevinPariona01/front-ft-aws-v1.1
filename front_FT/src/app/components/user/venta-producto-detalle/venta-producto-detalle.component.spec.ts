import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaProductoDetalleComponent } from './venta-producto-detalle.component';

describe('VentaProductoDetalleComponent', () => {
  let component: VentaProductoDetalleComponent;
  let fixture: ComponentFixture<VentaProductoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaProductoDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaProductoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
