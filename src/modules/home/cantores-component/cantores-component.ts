import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

import { PessoaService } from '../../../core/services/pessoa-service';
import { Pessoa } from '../../../core/models/pessoa';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-cantores-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    NgxMaskDirective
  ],
  templateUrl: './cantores-component.html',
  styleUrl: './cantores-component.css'
})
export class CantoresComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private PessoaService: PessoaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nomePessoa: ['', Validators.required],
      cpfPessoa: ['', [Validators.required, this.cpfValidator()]],
    });
  }

  cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value;

    if (!cpf) {
      return null;
    }

    const cpfLimpo = cpf.replace(/[^\d]/g, '');

    if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) {
      return { cpfInvalido: true };
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(9, 10))) return { cpfInvalido: true };

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(10, 11))) return { cpfInvalido: true };

    return null;
  };
}


  adicionarCantor() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('❌ Preencha todos os campos', 'Fechar', {
        duration: 4000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    const cpf: string = this.form.value.cpfPessoa.replace(/[^\d]/g, '');

    const novoCantor: Pessoa = {
      nomePessoa: this.form.value.nomePessoa,
      cpfPessoa: cpf,
      qtdVezCantada: 0,
      mesa: {
        mesaId: 1
      }
    };

    this.PessoaService.create(novoCantor).subscribe({
      next: () => {
        this.snackBar.open('✅ Cantor adicionado com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.form.reset();
        window.history.back();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao cadastrar funcionário:', err);
        const mensagemErro = err.error?.message || '❌ Erro ao criar pessoa. O cpf pode já estar em uso.';
        this.snackBar.open(mensagemErro, 'Fechar', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      },
    });
  }
}
