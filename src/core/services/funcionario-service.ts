import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../../environment/enviorenment';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private readonly apiUrl = env.apiUrl + '/funcionarios';

  constructor(private httpClient: HttpClient) {}

  criarFunc(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(this.apiUrl, funcionario);
  }

  findById(id: number): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(`${this.apiUrl}/${id}`);
  }

  findAll(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.apiUrl);
  }

  deletar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
