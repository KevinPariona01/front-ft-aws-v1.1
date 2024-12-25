import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarPorcentajeSeleccionadoComponent } from './cambiar-porcentaje-seleccionado.component';

describe('CambiarPorcentajeSeleccionadoComponent', () => {
  let component: CambiarPorcentajeSeleccionadoComponent;
  let fixture: ComponentFixture<CambiarPorcentajeSeleccionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarPorcentajeSeleccionadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarPorcentajeSeleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
