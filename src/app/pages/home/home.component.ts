// src/app/pages/home/home.component.ts
import { Component }              from '@angular/core';
import { CommonModule }           from '@angular/common';
import { Router, RouterModule }   from '@angular/router';
import { FormsModule }            from '@angular/forms';

import { AuthService }            from '../../shared/services/auth.service';
import { ProductoService }        from '../../shared/services/producto.service';
import { Producto }               from '../../shared/models/producto.model';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  /* --------- estado --------- */
  productos: Producto[] = [];
  msg = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private productoService: ProductoService
  ) {}

  /* ---------------- Ciclo de vida ---------------- */
  ngOnInit(): void {
    this.productoService.listarCatalogo().subscribe({
      next : prods => (this.productos = prods),
      error: err   => console.error('Error al cargar productos', err)
    });
  }

  /* -------------- Navegación rápida -------------- */
  navigateTo(action: 'comprar' | 'vender' | 'pedidos'): void {
    const ruta =
      action === 'comprar' ? '/comprar-producto' :
        action === 'vender'  ? '/anadir-producto'   :
          '/pedidos';               // ⭐ nueva ruta
    this.router.navigate([ruta]);
  }

  /* -------- Detalle de un producto -------- */
  verDetalle(producto: Producto): void {
    this.router.navigate(['/detalle-producto', producto.id]);
  }

  /* --------------- Sesión ---------------- */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
