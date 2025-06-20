import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, LoginDto } from '../../shared/services/auth.service';
import { LogoComponent } from "../../components/logo/logo.component";

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  msg = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    const dto: LoginDto = { email: this.email, password: this.password };
    this.msg = 'Enviando…';

    this.auth.login(dto).subscribe({
      next: (respuesta: string) => {
        if (respuesta.includes('correcto')) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', this.email);
          this.router.navigate(['/home']);
        } else {
          this.msg = respuesta;
        }
      },
      error: err => {
        const mensaje = typeof err.error === 'string' ? err.error : 'Error al iniciar sesión.';
        this.msg = 'Error: ' + mensaje;
      }
    });
  }
}
