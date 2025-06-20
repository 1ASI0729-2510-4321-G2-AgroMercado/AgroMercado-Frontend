import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterModule }      from '@angular/router';

import { OrderService,  Order }    from '../../shared/services/order.service';
import { ProductoService }         from '../../shared/services/producto.service';
import { Producto }                from '../../shared/models/producto.model';   // ✅ modelo, no service
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-pedidos',
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  /** Pedido con el nombre de producto ya incluido */
  pedidos: (Order & { productoNombre?: string })[] = [];

  msg = '';

  constructor(
    private orderService   : OrderService,
    private productoService: ProductoService
  ) {}

  /* ───────── ngOnInit ───────── */
  ngOnInit(): void { this.cargarPedidos(); }

  /* ───────── Cargar Pedidos ───────── */
  private cargarPedidos(): void {
    this.msg = 'Cargando…';

    this.orderService.listarOrdenes().subscribe({
      next : ordenes => {
        if (!ordenes.length) { this.pedidos = []; this.msg = ''; return; }

        this.productoService.listarCatalogo().subscribe({
          next : productos => {
            const dicc = new Map<number, string>(
              productos.map((p: Producto) => [p.id!, p.nombre])
            );
            this.pedidos = ordenes.map(o => ({
              ...o,
              productoNombre: dicc.get(o.productoId) ?? `#${o.productoId}`
            }));
            this.msg = '';
          },
          error: () => { this.pedidos = ordenes; this.msg = 'Catálogo no disponible.'; }
        });
      },
      error: () => this.msg = 'Error al obtener pedidos.'
    });
  }

  /* ───────── Marcar entregado ───────── */
  marcarEntregado(id: number): void {
    this.orderService.eliminarOrden(id).subscribe({
      next : () => this.pedidos = this.pedidos.filter(o => o.id !== id),
      error: () => alert('No se pudo marcar como entregado')
    });
  }
}
