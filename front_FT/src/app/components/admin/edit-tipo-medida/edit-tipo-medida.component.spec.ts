import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipoMedidaComponent } from './edit-tipo-medida.component';

describe('EditTipoMedidaComponent', () => {
  let component: EditTipoMedidaComponent;
  let fixture: ComponentFixture<EditTipoMedidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTipoMedidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTipoMedidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
