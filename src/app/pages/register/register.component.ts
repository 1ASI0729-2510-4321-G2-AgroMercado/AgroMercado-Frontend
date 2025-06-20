// src/app/pages/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, RegisterDto } from '../../shared/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  msg = '';

  constructor(private auth: AuthService, private router: Router) {}

  save(): void {
    const dto: RegisterDto = {
      nombre: this.nombre,
      email: this.email,
      password: this.password
    };
    this.msg = 'Enviando…';

    this.auth.register(dto).subscribe({
      next: txt => {
        this.msg = txt;
        if (txt.includes('exitoso')) {
          setTimeout(() => this.router.navigate(['/login']), 1200);
        }
      },
      error: err => this.msg = 'Error: ' + err.error
    });
  }
}
