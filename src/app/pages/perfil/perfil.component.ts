import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService, Usuario } from '../../shared/services/usuario.service';

@Component({
  standalone: true,
  selector: 'app-perfil',
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  usuario?: Usuario;
  msg = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const idUsuario = localStorage.getItem('userId');
    this.msg = 'Cargando…';

    if (idUsuario) {
      this.usuarioService.obtener(+idUsuario).subscribe({
        next: (user: Usuario) => {
          this.usuario = user;
          this.msg = '';
        },
        error: (err: any) => this.msg = 'Error: ' + err.error
      });
    } else {
      this.msg = 'Usuario no identificado.';
    }
  }

  cambiarNombre(): void {
    alert('Función cambiar nombre (simulada)');
  }

  cambiarCorreo(): void {
    alert('Función cambiar correo (simulada)');
  }

  cambiarPassword(): void {
    alert('Función cambiar contraseña (simulada)');
  }

  eliminarCuenta(): void {
    alert('Función eliminar cuenta (simulada)');
  }

  confirmarCambios(): void {
    alert('Cambios confirmados (simulado)');
  }
}
