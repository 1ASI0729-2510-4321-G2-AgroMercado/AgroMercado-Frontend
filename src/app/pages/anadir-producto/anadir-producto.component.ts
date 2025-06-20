import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductoService } from '../../shared/services/producto.service';
import { Producto } from '../../shared/models/producto.model';


@Component({
  standalone: true,
  selector: 'app-anadir-producto',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './anadir-producto.component.html',
  styleUrls: ['./anadir-producto.component.scss']
})
export class AnadirProductoComponent {
  nombre = '';
  descripcion = '';
  precio!: number;
  cantidadDisponible!: number;

  toastMsg = '';
  toastType: 'success' | 'error' = 'success'; // control de color del toast

  private readonly vendedorEmail = 'prueba@correo.com';

  constructor(
    private productoService: ProductoService,
    public router: Router
  ) {}

  publicar(): void {
    const nuevo: Producto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      cantidadDisponible: this.cantidadDisponible,
      vendedorEmail: this.vendedorEmail
    };

    this.productoService.crear(nuevo).subscribe({
      next: () => {
        this.showToast('Producto publicado correctamente ✔', 'success');
        setTimeout(() => this.router.navigate(['/home']), 1500);
      },
      error: err => {
        this.showToast('Error al publicar: ' + err.error, 'error');
      }
    });
  }

  showToast(message: string, type: 'success' | 'error'): void {
    this.toastMsg = message;
    this.toastType = type;
    setTimeout(() => this.toastMsg = '', 3000); // desaparece a los 3s
  }
}
