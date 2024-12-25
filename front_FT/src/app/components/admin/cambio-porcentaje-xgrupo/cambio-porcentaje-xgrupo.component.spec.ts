import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPorcentajeXGrupoComponent } from './cambio-porcentaje-xgrupo.component';

describe('CambioPorcentajeXGrupoComponent', () => {
  let component: CambioPorcentajeXGrupoComponent;
  let fixture: ComponentFixture<CambioPorcentajeXGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioPorcentajeXGrupoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioPorcentajeXGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
