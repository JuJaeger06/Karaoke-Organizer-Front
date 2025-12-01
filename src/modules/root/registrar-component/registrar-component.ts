import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

import { FuncionarioService } from '../../../core/services/funcionario-service';
import { Funcionario } from '../../../core/models/funcionario';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registrar-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './registrar-component.html',
  styleUrl: './registrar-component.css',
})
export class RegistrarComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      confirmsenha: ['', Validators.required],
    }, {
      validator: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator(g: FormGroup) {
    return g.get('senha')?.value === g.get('confirmsenha')?.value
      ? null : { 'mismatch': true };
  }

  criarFunc() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('❌ Preencha todos os campos e verifique a confirmação de senha.', 'Fechar', {
        duration: 4000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    const novoFuncionario: Funcionario = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      senha: this.form.value.senha,
    };

    this.funcionarioService.criarFunc(novoFuncionario).subscribe({
      next: () => {
        this.snackBar.open('✅ Funcionário criado com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.form.reset();
        window.history.back();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao cadastrar funcionário:', err);
        const mensagemErro = err.error?.message || '❌ Erro ao criar funcionário. O e-mail pode já estar em uso.';
        this.snackBar.open(mensagemErro, 'Fechar', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      },
    });
  }

  voltar() {
    window.history.back();
  }
}
