import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPorcentajeTipoMedidaComponent } from './cambio-porcentaje-tipo-medida.component';

describe('CambioPorcentajeTipoMedidaComponent', () => {
  let component: CambioPorcentajeTipoMedidaComponent;
  let fixture: ComponentFixture<CambioPorcentajeTipoMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioPorcentajeTipoMedidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioPorcentajeTipoMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
