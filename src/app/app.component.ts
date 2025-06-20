import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';  

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    TranslateModule
  ]
})
export class AppComponent {
  isLogin = false;

  constructor(
    private router: Router,
    private translate: TranslateService 
  ) {
    // Detecta si está en /login
    this.isLogin = this.router.url.startsWith('/login');

    // Cambios de ruta
    this.router.events
      .pipe(
        filter(evt => evt instanceof NavigationEnd),
        startWith({ urlAfterRedirects: this.router.url })
      )
      .subscribe((evt: any) => {
        this.isLogin = evt.urlAfterRedirects.startsWith('/login');
        console.log('[APP] isLogin =', this.isLogin, 'url =', evt.urlAfterRedirects);
      });

    // Configurar traducciones
    this.translate.addLangs(['en', 'es']);     
    this.translate.setDefaultLang('en');         
    this.translate.use('en');                     
  }
}
