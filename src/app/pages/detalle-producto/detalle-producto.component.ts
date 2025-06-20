// src/app/pages/detalle-producto/detalle-producto.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../shared/services/producto.service';
import { RatingService } from '../../shared/services/rating.service';
import { OrderService, NuevaOrdenDto } from '../../shared/services/order.service';
import { Producto } from '../../shared/models/producto.model';
import { Comentario } from '../../shared/models/comentario.model';



@Component({
  standalone: true,
  selector: 'app-detalle-producto',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent {
  producto?: Producto;
  comentarios: Comentario[] = [];
  cantidad = 1;
  msg = '';

  // Variables para comentario
  mostrarFormularioComentario = false;
  nuevoComentarioTexto = '';

  // Variables para eliminar producto
  mostrarModalEliminar = false;

  // Variables para Toast
  toastVisible = false;
  toastMessage = '';

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
      compradorEmail: 'cliente@example.com',
      cantidad: this.cantidad
    };

    this.msg = 'Enviando pedido…';
    this.orderService.crear(dto).subscribe({
      next: () => this.router.navigate(['/confirmacion-venta']),
      error: err => this.msg = 'Error al realizar pedido'
    });
  }

  toggleFormularioComentario(): void {
    this.mostrarFormularioComentario = !this.mostrarFormularioComentario;
    this.nuevoComentarioTexto = '';
  }

  guardarNuevoComentario(): void {
    if (!this.nuevoComentarioTexto.trim() || !this.producto) return;

    const dto = {
      productoId: this.producto.id!,
      vendedorEmail: this.producto.vendedorEmail || '',
      compradorEmail: 'cliente@example.com', // usa el email real si tienes login
      puntuacion: 5,
      comentario: this.nuevoComentarioTexto.trim()
    };

    this.ratingService.crear(dto).subscribe({
      next: () => {
        this.comentarios.push({
          ...dto,
          id: Math.floor(Math.random() * 1000000),
          fechaCalificacion: new Date().toISOString()
        });
        this.mostrarFormularioComentario = false;
        this.nuevoComentarioTexto = '';
        this.mostrarToast('Comentario guardado correctamente.');
      },
      error: err => {
        console.error('Error al guardar comentario', err);
        this.mostrarToast('Error al guardar el comentario.');
      }
    });
  }


  confirmarEliminar(): void {
    this.mostrarModalEliminar = true;
  }

  cancelarEliminar(): void {
    this.mostrarModalEliminar = false;
  }

  eliminarProducto(): void {
    if (!this.producto || !this.producto.id) return;

    this.productoService.eliminar(this.producto.id).subscribe({
      next: () => {
        this.mostrarModalEliminar = false;
        this.mostrarToast('Producto eliminado correctamente.');
        setTimeout(() => this.router.navigate(['/home']), 2200);
      },
      error: () => {
        this.mostrarModalEliminar = false;
        this.mostrarToast('Error al eliminar el producto.');
      }
    });
  }

  mostrarToast(mensaje: string): void {
    this.toastMessage = mensaje;
    this.toastVisible = true;

    setTimeout(() => {
      this.toastVisible = false;
    }, 2000);
  }
}
