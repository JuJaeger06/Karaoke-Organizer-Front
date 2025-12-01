import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

import { MesaService } from '../../../../core/services/mesa-service';
import { MusicaService } from '../../../../core/services/musica-service';
import { Musica } from '../../../../core/models/musica';

export interface CantorMesa {
  id: number;
  nome: string;
}

export interface ModalData {
  cantores: CantorMesa[];
  mesaId: number;
}

@Component({
  selector: 'app-modal-add-musica',

  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    MatSnackBarModule
  ],
  standalone: true,
  templateUrl: './modal-add-musica-component.html',
  styleUrl: './modal-add-musica-component.css'
})
export class ModalAddMusicaComponent {

  musicaForm = new FormGroup({
    nome: new FormControl<string>('', Validators.required),
    cantorOriginal: new FormControl<string>('', Validators.required),
    cantorMesa: new FormControl<CantorMesa | null>(null, Validators.required),
  });


  cantores: CantorMesa[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private musicaService: MusicaService,
    private mesaService: MesaService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModalAddMusicaComponent>
  ) {
    this.cantores = data.cantores;
  }


  adicionarMusica() {
    if (this.musicaForm.invalid) {
      this.musicaForm.markAllAsTouched();
      this.snackBar.open('❌ Preencha todos os campos', 'Fechar', {
        duration: 4000,
        panelClass: ['snackbar-error']
      });
      return;
    }


    const novaMusicaData: Musica = {
      nomeMusica: this.musicaForm.value.nome!,
      cantorMusica: this.musicaForm.value.cantorOriginal!,
    };


    this.musicaService.create(novaMusicaData).pipe(
      switchMap((musicaCriada: Musica) => {
        const idMusica = musicaCriada.musicaId;
        const cantorSelecionado = this.musicaForm.value.cantorMesa!;
        const idMesa = 1;

        if (!idMusica) {
          throw new Error('ID da música não retornado após a criação.');
        }

        this.musicaService.adicionarCantor(idMusica, cantorSelecionado.id).subscribe(() => console.log("Cantor adicionado!"));;
        return this.mesaService.adicionarMusica(idMesa, idMusica);
      })
    ).subscribe({
      next: () => {
        this.snackBar.open('✅ Música adicionada à mesa com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.dialogRef.close(true);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro na criação ou adição da música:', err);
        const mensagemErro = err.error?.message || '❌ Erro ao adicionar música. Tente novamente.';
        this.snackBar.open(mensagemErro, 'Fechar', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });
      },
    });
  }
}
