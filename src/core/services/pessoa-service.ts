import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../environment/enviorenment';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private readonly apiUrl = env.apiUrl + '/pessoa';

  constructor(private httpClient: HttpClient) {}

  getAllPessoas(): Observable<Pessoa[]> {
    return this.httpClient.get<Pessoa[]>(`${this.apiUrl}/listar`);
  }

  getOnePessoa(id: number): Observable<Pessoa> {
    return this.httpClient.get<Pessoa>(`${this.apiUrl}/${id}`);
  }

  create(pessoa: Pessoa): Observable<Pessoa> {
    return this.httpClient.post<Pessoa>(this.apiUrl, pessoa);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
