import { Component, OnInit } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Observable, map, tap } from 'rxjs';

import { MesaService } from '../../../core/services/mesa-service';
import { MusicaService } from '../../../core/services/musica-service';
import { Pessoa } from '../../../core/models/pessoa';
import { ModalAddMusicaComponent } from './modal-add-musica/modal-add-musica.component';
import { Musica } from '../../../core/models/musica';
import { Mesa } from '../../../core/models/mesa';

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [
    CommonModule,
    MatGridList,
    MatCard,
    MatGridTile,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent implements OnInit {

  cantores: Pessoa[] = [];
  musicasMesa: Musica[] = [];
  mesaId: number = 1;


  constructor(private mesaService: MesaService, private musicaService: MusicaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.carregarCantores();
    this.getMusicas();
  }

  carregarCantores(): void {
    this.mesaService.getCantoresMesa(this.mesaId).subscribe({
      next: (data: Pessoa[]) => {
        this.cantores = data;
        console.log('Cantores da Mesa carregados:', this.cantores);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao buscar cantores da mesa:', error);
      }
    });
  }

  getCantoresNomes$(): Observable<Object[]> {
    return this.mesaService.getCantoresMesa(this.mesaId).pipe(
      map((pessoas: Pessoa[]) => pessoas.map(p => ({
        id: p.pessoaId,
        nome: p.nomePessoa
      })))
    );
  }

  getMusicas(): void {
    this.mesaService.getMesaById(this.mesaId).subscribe({
      next: (mesa: Mesa) => {
          this.musicasMesa = mesa.lstMusicas ?? [];
          console.log('Músicas da Mesa carregadas:', this.musicasMesa);
        },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao buscar cantores da mesa:', error);
      }
    });
  }

  openAddMusicDialog(): void {
    this.getCantoresNomes$().subscribe({
      next: (cantoresMesa: Object[]) => {

        const dialogRef = this.dialog.open(ModalAddMusicaComponent, {
          width: '400px',
          data: { cantores: cantoresMesa },
        });

        dialogRef.afterClosed().subscribe(() => {
          this.getMusicas()
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro ao carregar nomes dos cantores para o modal:', error);

      }
    });
  }

  removerMusica(id?: number): void {
    if (id === undefined) {
      console.error('ID da música é obrigatório para remoção.');
      return;
    }


    this.musicaService.delete(id).subscribe({
      next: () => {
        console.log(`Música ${id} removida com sucesso.`);
        this.getMusicas()
      },
      error: (error: HttpErrorResponse) => {
        console.error(`Erro ao remover música ${id}:`, error);
      }
    });
  }
}
