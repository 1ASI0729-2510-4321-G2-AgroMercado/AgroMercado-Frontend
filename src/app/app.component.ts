import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent {

  /** true ⇢ estamos en /login  | false ⇢ resto de vistas */
  isLogin = false;

  constructor(private router: Router) {

    /** ①  Estado inicial _antes_ de que Angular emita eventos */
    this.isLogin = this.router.url.startsWith('/login');

    /** ②  Se actualiza en cada NavigationEnd */
    this.router.events
      .pipe(
        filter(evt => evt instanceof NavigationEnd),
        startWith({ urlAfterRedirects: this.router.url })   // envía la primera vez
      )
      .subscribe((evt: any) => {
        this.isLogin = evt.urlAfterRedirects.startsWith('/login');
        console.log('[APP] isLogin =', this.isLogin, 'url =', evt.urlAfterRedirects);
      });
  }
}
