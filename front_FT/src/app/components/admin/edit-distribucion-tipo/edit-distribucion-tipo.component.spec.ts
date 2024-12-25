import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDistribucionTipoComponent } from './edit-distribucion-tipo.component';

describe('EditDistribucionTipoComponent', () => {
  let component: EditDistribucionTipoComponent;
  let fixture: ComponentFixture<EditDistribucionTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDistribucionTipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDistribucionTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
