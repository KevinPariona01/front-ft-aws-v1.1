import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosXNombreComponent } from './productos-xnombre.component';

describe('ProductosXNombreComponent', () => {
  let component: ProductosXNombreComponent;
  let fixture: ComponentFixture<ProductosXNombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosXNombreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosXNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
