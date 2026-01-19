import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoByIdComponent } from './producto-by-id.component';

describe('ProductoByIdComponent', () => {
  let component: ProductoByIdComponent;
  let fixture: ComponentFixture<ProductoByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
