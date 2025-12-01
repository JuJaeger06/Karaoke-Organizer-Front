import { Component } from '@angular/core';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCardActions} from '@angular/material/card';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-component',
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    MatCardActions,
    MatLabel,
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  protected onSubmit() {
    if (this.form.valid) {
      const {login, senha} = this.form.value;

      this.authService.login(login, senha).subscribe({
        next: (response) => {
          console.log('Login com sucesso, token', response.token);
          this.authService.setToken(response.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('Login falhou', err)
          const mensagemErro = err.error?.message || '❌ Funcionário não encontrado';
          this.snackBar.open(mensagemErro, 'Fechar', {
            duration: 5000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }

}
