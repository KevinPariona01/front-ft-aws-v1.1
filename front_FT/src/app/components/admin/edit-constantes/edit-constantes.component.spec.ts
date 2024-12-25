import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConstantesComponent } from './edit-constantes.component';

describe('EditConstantesComponent', () => {
  let component: EditConstantesComponent;
  let fixture: ComponentFixture<EditConstantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConstantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConstantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
