import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../interface/producto.interface';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelPedidoProductoService {

  constructor() { }

  setdatogeneral(worksheet:any, cell:any, value:any, fontsize:any, bolt:any, fg_color = 'FFFFFF', bg_color = '000000') {
    const titleRow = worksheet.getCell(cell)
    titleRow.value = value;
    titleRow.font = { name: 'ARIAL', family: 4, size: fontsize, bold: bolt };
    titleRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: fg_color },
      color: { argb: bg_color }
    };

    titleRow.alignment = { 
      vertical: 'middle', 
      horizontal: 'center',
      wrapText: true  // Esta propiedad asegura que el texto se ajuste a la celda
  };
  }

  boolForSioNo(bool:boolean) {
    let response = "No";
    if(bool){
      response = "Si";
    }
    return response;
  }

  exportarPedidoProducto(productos:Producto[]): Observable<Producto[]>{
    
    const workbook = new Workbook();
    const excel = workbook.addWorksheet('PRODUCTOS');

    let row = 1;

      excel.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(excel, 'A' + row, 'CÓDIGO', 10, true, '002060');
      excel.getCell('A' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
      excel.getCell('A' + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      excel.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(excel, 'B' + row, 'NOMBRE', 10, true, '002060');
      excel.getCell('B' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
      excel.getCell('B' + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      excel.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(excel, 'C' + row, 'CANTIDAD', 10, true, '002060');
      excel.getCell('C' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
      excel.getCell('C' + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      excel.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(excel, 'D' + row, 'PRECIO/COSTO', 10, true, '002060');
      excel.getCell('D' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
      excel.getCell('D' + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      excel.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(excel, 'E' + row, 'IGV', 10, true, '002060');
      excel.getCell('E' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
      excel.getCell('E' + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      excel.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(excel, 'F' + row, 'DOLAR', 10, true, '002060');
      excel.getCell('F' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
      excel.getCell('F' + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      excel.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(excel, 'G' + row, 'STOCK1', 10, true, '002060');
      excel.getCell('G' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
      excel.getCell('G' + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      excel.getCell('H' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(excel, 'H' + row, 'PEDIDO1', 10, true, '002060');
      excel.getCell('H' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
      excel.getCell('H' + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      excel.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(excel, 'I' + row, 'FECHA PEDIDO 1', 10, true, '002060');
      excel.getCell('I' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
      excel.getCell('I' + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      excel.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
      this.setdatogeneral(excel, 'J' + row, 'DESCRIPCION PEDIDO', 10, true, '002060');
      excel.getCell('J' + row).font = { color: { argb: 'FFFFFF' }, bold: true };
      excel.getCell('J' + row).border = {
          right: { style: 'thin' },
          bottom: { style: 'thin' },
      };

      productos.forEach( (element: Producto) => {
        
        row += 1;
        excel.getCell('A' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(excel, 'A' + row, element.c_codigo_producto , 10, false);
        excel.getCell('A' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };
  
        excel.getCell('B' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(excel, 'B' + row, element.c_nombre_producto + " " + element.c_detalle_primario_producto , 10, false);
        excel.getCell('B' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };
  
        excel.getCell('C' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(excel, 'C' + row, element.n_cantidad_viene_producto , 10, false);
        excel.getCell('C' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        excel.getCell('D' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(excel, 'D' + row, element.f_precio_producto , 10, false);
        excel.getCell('D' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        excel.getCell('E' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(excel, 'E' + row, this.boolForSioNo(element.b_igv_producto) , 10, false);
        excel.getCell('E' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        excel.getCell('F' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(excel, 'F' + row, this.boolForSioNo(element.b_dolar_producto) , 10, false);
        excel.getCell('F' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        excel.getCell('G' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(excel, 'G' + row, element.n_stock1 , 10, false);
        excel.getCell('G' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        excel.getCell('H' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(excel, 'H' + row, element.n_pedido1 , 10, false);
        excel.getCell('H' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        excel.getCell('I' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(excel, 'I' + row, element.c_fec_actu_pedido1 , 10, false);
        excel.getCell('I' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        excel.getCell('J' + row).alignment = { vertical: 'middle', horizontal: 'center' };
        this.setdatogeneral(excel, 'J' + row, element.c_descripcion_pedido , 10, false);
        excel.getCell('J' + row).border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

      });

      excel.getColumn(1).width = 15;
      excel.getColumn(2).width = 80;
      excel.getColumn(3).width = 10;
      excel.getColumn(4).width = 30;
      excel.getColumn(5).width = 10;
      excel.getColumn(6).width = 10;
      excel.getColumn(7).width = 15;
      excel.getColumn(8).width = 15;
      excel.getColumn(9).width = 40;
      excel.getColumn(10).width = 70;
      excel.getRow(row).height = 70;

      //FINAL DE EXCEL
      workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs.saveAs(blob, 'pedidos.xlsx');
      });

    
    return of(productos);
  }
}
