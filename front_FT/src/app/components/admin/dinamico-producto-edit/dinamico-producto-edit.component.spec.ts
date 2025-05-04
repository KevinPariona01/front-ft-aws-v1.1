import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicoProductoEditComponent } from './dinamico-producto-edit.component';

describe('DinamicoProductoEditComponent', () => {
  let component: DinamicoProductoEditComponent;
  let fixture: ComponentFixture<DinamicoProductoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DinamicoProductoEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinamicoProductoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
