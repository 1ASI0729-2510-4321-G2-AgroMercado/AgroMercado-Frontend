import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, RegisterDto } from '../../shared/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  /* ------------ plantilla en línea ------------ */
  template: `
    <div class="card">
      <h2>Crear cuenta</h2>

      <form #f="ngForm" (ngSubmit)="save()">
        <input name="nombre"     [(ngModel)]="nombre"   placeholder="Nombre"      required>
        <input name="email"      [(ngModel)]="email"    placeholder="Email"       type="email" required>
        <input name="password"   [(ngModel)]="password" placeholder="Contraseña"  type="password" required minlength="7">
        <button type="submit" [disabled]="f.invalid">Registrar</button>
      </form>

      <p>{{ msg }}</p>

      <a routerLink="/login" class="alt">¿Ya tienes cuenta? Inicia sesión</a>
    </div>
  `,
  /* ------------- estilos en línea ------------- */
  styles: [`
    .card{
      width:320px;margin:100px auto;padding:24px;
      border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,.12);
      font-family:Arial,sans-serif;display:flex;flex-direction:column;gap:14px
    }
    h2{text-align:center;margin-bottom:10px}
    input{
      padding:10px;border:1px solid #bbb;border-radius:6px;
      font-size:1rem;width:100%
    }
    input:focus{border-color:#1976d2;outline:none}
    button{
      padding:10px 0;background:#1976d2;border:none;color:#fff;
      border-radius:6px;font-weight:600;cursor:pointer;
      transition:background .2s
    }
    button:hover{background:#125aa0}
    button:disabled{background:#9e9e9e;cursor:not-allowed}
    .alt{
      text-align:center;font-size:.9rem;color:#1976d2;text-decoration:none
    }
    .alt:hover{text-decoration:underline}
  `]
})
export class RegisterComponent {
  nombre = ''; email = ''; password = ''; msg = '';

  constructor(private auth: AuthService, private router: Router) {}

  save(): void {
    const dto: RegisterDto = { nombre: this.nombre, email: this.email, password: this.password };
    this.msg = 'Enviando…';

    this.auth.register(dto).subscribe({
      next: txt => {
        this.msg = txt;
        if (txt.includes('exitoso')) setTimeout(() => this.router.navigate(['/login']), 1200);
      },
      error: err => this.msg = 'Error: ' + err.error
    });
  }
}
