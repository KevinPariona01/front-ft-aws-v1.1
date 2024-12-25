import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribucionTipoComponent } from './distribucion-tipo.component';

describe('DistribucionTipoComponent', () => {
  let component: DistribucionTipoComponent;
  let fixture: ComponentFixture<DistribucionTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistribucionTipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistribucionTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
