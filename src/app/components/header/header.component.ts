// src/app/components/header/header.component.ts
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  /** Si es false, el header no se muestra (solo ocurre en /login) */
  visible = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    /* Estado inicial y cada vez que la ruta cambia */
    this.actualizarVisibilidad(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.actualizarVisibilidad(e.urlAfterRedirects));
  }

  /* ---- Navegación ------------------------------------------ */
  goHome():    void { this.router.navigate(['/home']); }
  goPerfil():  void { this.router.navigate(['/perfil']); }
  goPedidos(): void { this.router.navigate(['/pedidos']); }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /* ---- Helper ---------------------------------------------- */
  private actualizarVisibilidad(url: string): void {
    this.visible = !url.startsWith('/login');   // se oculta solo en /login
  }
}
