import { TestBed } from '@angular/core/testing';

import { ExcelPedidoProductoService } from './excel-pedido-producto.service';

describe('PedidoProductoService', () => {
  let service: ExcelPedidoProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelPedidoProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
