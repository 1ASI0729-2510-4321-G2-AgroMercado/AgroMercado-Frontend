// src/app/pages/anadir-producto/anadir-producto.component.ts
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
  template: `
    <div class="card">
      <h2>Publicar nuevo producto</h2>

      <form (ngSubmit)="publicar()">
        <input placeholder="Nombre" [(ngModel)]="nombre" name="nombre" required />

        <textarea placeholder="Descripción"
                  [(ngModel)]="descripcion" name="descripcion" required></textarea>

        <input placeholder="Precio" type="number" min="0"
               [(ngModel)]="precio" name="precio" required />

        <input placeholder="Cantidad disponible" type="number" min="1"
               [(ngModel)]="cantidadDisponible" name="cantidadDisponible" required />

        <button type="submit">Publicar</button>
        <button type="button" class="sec" (click)="router.navigate(['/home'])">
          Volver al inicio
        </button>
      </form>

      <p *ngIf="msg">{{ msg }}</p>
    </div>
  `,
  styles: [`
    .card {width:380px;margin:80px auto;padding:24px;border-radius:12px;
           box-shadow:0 6px 18px rgba(0,0,0,.12);display:flex;
           flex-direction:column;gap:16px;font-family:Arial}
    input,textarea{width:100%;padding:10px;border:1px solid #ccc;border-radius:6px}
    textarea{resize:vertical;min-height:70px}
    button{padding:10px 14px;border:none;border-radius:6px;font-weight:600;
           cursor:pointer;color:#fff;background:#1976d2;transition:.2s}
    button.sec{background:#757575}
    button:hover{background:#125aa0}
    button.sec:hover{background:#555}
    form{display:flex;flex-direction:column;gap:12px}
    p{font-size:.9rem;color:#555}
  `]
})
export class AnadirProductoComponent {
  nombre = '';
  descripcion = '';
  precio!: number;
  cantidadDisponible!: number;
  msg = '';

  // email “dummy” hasta que estés usando sesión
  private readonly vendedorEmail = 'prueba@correo.com';

  constructor(
    private productoService: ProductoService,
    public  router: Router
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
        this.msg = 'Producto publicado ✔';
        this.router.navigate(['/home']);
      },
      error: err => this.msg = 'Error al publicar: ' + err.error
    });
  }
}
