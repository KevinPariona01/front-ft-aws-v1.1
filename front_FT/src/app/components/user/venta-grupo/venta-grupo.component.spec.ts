import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaGrupoComponent } from './venta-grupo.component';

describe('VentaGrupoComponent', () => {
  let component: VentaGrupoComponent;
  let fixture: ComponentFixture<VentaGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaGrupoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
