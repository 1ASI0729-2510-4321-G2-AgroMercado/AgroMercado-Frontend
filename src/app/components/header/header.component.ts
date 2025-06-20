// src/app/components/header/header.component.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    MatButtonToggleModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /** Si es false, el header no se muestra (solo ocurre en /login) */
  visible = true;

  /** Idioma actual para el toggle */
  currentLang: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService,
  ) {
    // Estado inicial y cada vez que la ruta cambia
    this.actualizarVisibilidad(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => this.actualizarVisibilidad(e.urlAfterRedirects));

    // Idioma actual (fallback si no hay uno definido aún)
    this.currentLang = this.translate.currentLang || this.translate.getDefaultLang();
  }

  /* ---- Navegación ------------------------------------------ */
  goHome():    void { this.router.navigate(['/home']); }
  goPerfil():  void { this.router.navigate(['/perfil']); }
  goPedidos(): void { this.router.navigate(['/pedidos']); }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /* ---- Idiomas --------------------------------------------- */
  switchLang(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
  }

  /* ---- Helper ---------------------------------------------- */
  private actualizarVisibilidad(url: string): void {
    this.visible = !url.startsWith('/login');   // se oculta solo en /login
  }
}
