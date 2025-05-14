// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { ProductoService } from '../../shared/services/producto.service';
import { Producto } from '../../shared/models/producto.model';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card">
      <h2>¡Bienvenido a AgroMercado!</h2>

      <div class="actions">
        <button (click)="navigateTo('comprar')">Comprar productos</button>
        <button (click)="navigateTo('vender')">Añadir producto</button>
      </div>

      <!-- mensaje de carga -->
      <p *ngIf="msg">{{ msg }}</p>

      <!-- catálogo -->
      <section class="catalog" *ngIf="productos.length; else vacio">
        <div class="card-producto" *ngFor="let p of productos" (click)="verDetalle(p)">
          <h3>{{ p.nombre }}</h3>
          <p>{{ p.descripcion }}</p>
          <small>Cantidad: {{ p.cantidadDisponible }}</small>
          <span class="precio">{{ p.precio | currency:'USD' }}</span>
        </div>
      </section>

      <ng-template #vacio>
        <p>No hay productos disponibles.</p>
      </ng-template>

      <button class="logout" (click)="logout()">Cerrar sesión</button>
    </div>
  `,
  styles: [`
    .card {
      width: 360px; margin: 60px auto; padding: 24px; border-radius: 12px;
      box-shadow: 0 6px 18px rgba(0,0,0,.12);
      font-family: Arial, sans-serif; display: flex; flex-direction: column; gap: 20px;
      text-align: center;
    }
    .actions {
      display: flex; flex-direction: column; gap: 12px;
    }
    button {
      padding: 10px; background: #1976d2; border: none; color: #fff; border-radius: 6px;
      font-weight: 600; cursor: pointer; transition: background .2s;
    }
    button:hover {
      background: #125aa0;
    }
    .logout {
      background: #d32f2f;
    }
    .logout:hover {
      background: #b71c1c;
    }

    /* catálogo */
    .catalog {
      display: grid; gap: 16px; text-align: left;
    }
    .card-producto {
      padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,.08);
      display: flex; flex-direction: column; gap: 4px;
      cursor: pointer; /* 👈 agregado para hacer las tarjetas clickeables visualmente */
      transition: box-shadow .2s;
    }
    .card-producto:hover {
      box-shadow: 0 4px 10px rgba(0,0,0,.18);
    }
    .card-producto h3 {
      margin: 0; font-size: 1.1rem;
    }
    .precio {
      font-weight: 600; color: #1976d2;
    }
  `]
})
export class HomeComponent {

  productos: Producto[] = [];
  msg = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    /* carga del catálogo */
    this.productoService.listarCatalogo().subscribe({
      next : prods => this.productos = prods,
      error: err   => console.error('Error al cargar productos', err)
    });
  }

  navigateTo(action: 'comprar' | 'vender'): void {
    this.router.navigate([
      action === 'comprar' ? '/comprar-producto' : '/anadir-producto'
    ]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /** 🆕 método para ir al detalle del producto */
  verDetalle(producto: Producto): void {
    this.router.navigate(['/detalle-producto', producto.id]);
  }
}
