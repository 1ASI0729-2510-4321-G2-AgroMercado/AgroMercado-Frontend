// src/app/pages/detalle-producto/detalle-producto.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../shared/services/producto.service';
import { RatingService, CrearComentarioDto } from '../../shared/services/rating.service';
import { OrderService, NuevaOrdenDto } from '../../shared/services/order.service';
import { Producto } from '../../shared/models/producto.model';
import { Comentario } from '../../shared/models/comentario.model';

@Component({
  standalone: true,
  selector: 'app-detalle-producto',
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="card" *ngIf="producto; else cargando">

      <!-- 🥔 Imagen, nombre, descripción -->
      <div class="producto-info">
        <img src="https://via.placeholder.com/120" alt="Producto" class="img-producto">
        <div>
          <h2>{{ producto.nombre }}</h2>
          <p>{{ producto.descripcion }}</p>
          <p class="precio">{{ producto.precio | currency:'USD' }} / unidad</p>
          <small>Cantidad disponible: {{ producto.cantidadDisponible }}</small>
        </div>
      </div>

      <!-- 📦 Formulario para realizar pedido -->
      <form #f="ngForm" (ngSubmit)="realizarPedido()">
        <input name="cantidad" [(ngModel)]="cantidad" type="number" min="1" required placeholder="Cantidad a comprar">

        <!-- NUEVO: campo para comentario -->
        <textarea name="comentario" [(ngModel)]="comentario" placeholder="Escribe un comentario..." rows="3"></textarea>

        <button type="submit" [disabled]="f.invalid">Realizar Pedido</button>
      </form>

      <p class="msg" *ngIf="msg">{{ msg }}</p>

      <!-- 💬 Comentarios -->
      <h3>Comentarios</h3>
      <div class="comentarios" *ngIf="comentarios.length; else sinComentarios">
        <div class="comentario" *ngFor="let c of comentarios">
          <p><strong>{{ c.compradorEmail }}:</strong> {{ c.comentario }}</p>
        </div>
      </div>

      <ng-template #sinComentarios>
        <p>No hay comentarios aún.</p>
      </ng-template>

    </div>

    <ng-template #cargando>
      <p>Cargando producto...</p>
    </ng-template>
  `,
  styles: [`
    .card {
      width: 380px; margin: 60px auto; padding: 24px;
      border-radius: 12px; box-shadow: 0 6px 18px rgba(0,0,0,.12);
      font-family: Arial, sans-serif; display: flex; flex-direction: column; gap: 20px;
    }
    .producto-info { display: flex; align-items: center; gap: 16px; }
    .img-producto { width: 120px; height: 120px; object-fit: cover; border-radius: 8px; }
    h2 { margin: 0 0 8px; }
    .precio { font-weight: bold; color: #1976d2; }
    input, textarea {
      padding: 10px; border: 1px solid #bbb; border-radius: 6px;
      font-size: 1rem; width: 100%;
    }
    input:focus, textarea:focus { border-color: #1976d2; outline: none; }
    button {
      padding: 10px; background: #1976d2; border: none; color: #fff;
      border-radius: 6px; font-weight: 600; cursor: pointer; transition: background .2s;
      margin-top: 10px;
    }
    button:hover { background: #125aa0; }
    button:disabled { background: #9e9e9e; cursor: not-allowed; }
    .msg { color: green; text-align: center; margin-top: 10px; }
    .comentarios { display: flex; flex-direction: column; gap: 8px; }
    .comentario { background: #f1f1f1; padding: 8px; border-radius: 6px; }
  `]
})
export class DetalleProductoComponent {
  producto?: Producto;
  comentarios: Comentario[] = [];
  cantidad = 1;
  comentario = ''; // 👈 NUEVO campo para guardar comentario escrito
  msg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private ratingService: RatingService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.msg = 'Producto no encontrado.';
      return;
    }

    this.productoService.obtener(id).subscribe({
      next: prod => this.producto = prod,
      error: () => this.msg = 'Error al cargar producto.'
    });

    this.ratingService.listarPorProducto(id).subscribe({
      next: comentarios => this.comentarios = comentarios,
      error: () => console.error('Error al cargar comentarios')
    });
  }

  realizarPedido(): void {
    if (!this.producto) return;

    const dto: NuevaOrdenDto = {
      productoId: this.producto.id!,
      compradorEmail: 'cliente@example.com', // ← debes cambiar luego por email real
      cantidad: this.cantidad
    };

    this.msg = 'Enviando pedido…';
    this.orderService.crear(dto).subscribe({
      next: () => {
        // Verificamos comentario
        if (this.comentario.trim()) {
          const comentarioDto: CrearComentarioDto = {
            productoId: this.producto!.id!, // 👈 aquí agregamos !
            vendedorEmail: this.producto!.vendedorEmail!, // 👈 aquí agregamos !
            compradorEmail: 'cliente@example.com', // ← luego se cambia por usuario real
            puntuacion: 5, // default por ahora
            comentario: this.comentario.trim()
          };
          this.ratingService.crear(comentarioDto).subscribe({
            next: () => this.router.navigate(['/confirmacion-venta']),
            error: () => this.router.navigate(['/confirmacion-venta'])
          });
        } else {
          this.router.navigate(['/confirmacion-venta']);
        }
      },
      error: () => this.msg = 'Error al realizar pedido'
    });
  }
}
