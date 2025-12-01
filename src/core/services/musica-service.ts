import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../environment/enviorenment';
import { Observable } from 'rxjs';
import { Musica } from '../models/musica';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root',
})
export class MusicaService {
  private readonly apiUrl = env.apiUrl + '/musica';

  constructor(private httpClient: HttpClient) {}

  getAllMusicas(): Observable<Musica[]> {
    return this.httpClient.get<Musica[]>(`${this.apiUrl}/listar`);
  }

  getOneMusica(id: number): Observable<Musica> {
    return this.httpClient.get<Musica>(`${this.apiUrl}/${id}`);
  }

  create(musica: Musica): Observable<Musica> {
    return this.httpClient.post<Musica>(this.apiUrl, musica);
  }

  update(musica: Musica): Observable<void> {
    return this.httpClient.put<void>(this.apiUrl, musica);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCantoresDaMusica(id: number): Observable<Pessoa[]> {
    return this.httpClient.get<Pessoa[]>(`${this.apiUrl}/cantores/${id}`);
  }

  adicionarCantor(musicaId: number, pessoaId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/adicionar/${musicaId}/cantor/${pessoaId}`, {});
  }

  removerCantor(musicaId: number, pessoaId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/remover/${musicaId}/cantor/${pessoaId}`);
  }
}
