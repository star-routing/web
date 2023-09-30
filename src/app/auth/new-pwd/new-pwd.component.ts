import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-pwd',
  templateUrl: './new-pwd.component.html',
  styleUrls: ['./new-pwd.component.scss']
})
export class NewPwdComponent {

  newPwdForm = new FormGroup({
    contrasenaUsuario: new FormControl('', Validators.required),
    repetirContrasena: new FormControl('', Validators.required),
  })

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // suscribirse a los cambios en el campo 'contrasenaUsuario'
    this.newPwdForm.get('contrasenaUsuario')?.valueChanges.subscribe(() => {
      this.passwordMatchValidator();
    });

    // suscribirsea los cambios en el campo 'repetirContrasena'
    this.newPwdForm.get('repetirContrasena')?.valueChanges.subscribe(() => {
      this.passwordMatchValidator();
    });
  }


  loading = false;
  showPassword: boolean = false;

  passwordMatchValidator() {
    const newPassword = this.newPwdForm.get('contrasenaUsuario')?.value;
    const confirmPassword = this.newPwdForm.get('repetirContrasena')?.value;

    if (newPassword === confirmPassword) {
      this.newPwdForm.get('repetirContrasena')?.setErrors(null);
    } else {
      this.newPwdForm.get('repetirContrasena')?.setErrors({ passwordMismatch: true });
    }
  }

  onNewPwd() {
    this.loading = true;
    const newPwd = this.newPwdForm.get('contrasenaUsuario')?.value;
    const token = this.route.snapshot.paramMap.get('token');
    this.auth.onNewPwd({ newPwd, token }).subscribe(
      data => {
        this.loading = false;
        Swal.fire({
          icon: data.status == 'ok' ? 'success' : 'error',
          title: data.status == 'ok' ? 'Contraseña actualizada' : 'Error',
          text: data.msj,
        }).then(() => {
          if (data.status == 'ok') {
            this.router.navigate(['auth/login']);
          }
        });
      },
      error => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al comunicarse con el servidor. Por favor, revisa tu conexión a internet o inténtalo nuevamente',
        });
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
