import { Component }         from '@angular/core';
import { CommonModule }      from '@angular/common';
import { Router }            from '@angular/router';
import { Producto }          from '../../shared/models/producto.model';

@Component({
  standalone : true,
  selector   : 'app-confirmacion-venta',
  imports    : [CommonModule],
  templateUrl: './confirmacion-venta.component.html',
  styleUrls  : ['./confirmacion-venta.component.scss']
})
export class ConfirmacionVentaComponent {

  producto!: Producto;

  constructor(private router: Router) {
    /* se espera que el componente anterior envíe
       { state:{ producto } }                        */
    const p = this.router.getCurrentNavigation()?.extras.state?.['producto'];
    if (!p) { this.router.navigate(['/home']); }
    this.producto = p;
  }

  volverInicio(): void {
    this.router.navigate(['/home']);
  }
}
