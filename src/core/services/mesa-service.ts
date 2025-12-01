import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {env} from '../../environment/enviorenment';
import {Observable} from 'rxjs';
import {Mesa} from '../models/mesa';
import { Pessoa } from '../models/pessoa';
import { Musica } from '../models/musica';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private readonly apiUrl = env.apiUrl + '/mesa';


  constructor(private httpClient: HttpClient) {
  }

  getMesas() : Observable<Mesa[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/listar`);
  }

   getMesaById(id: number) : Observable<Mesa> {
    return this.httpClient.get<any>(`${this.apiUrl}/${id}`);
  }

  getCantoresMesa(id: number) : Observable<Pessoa[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/${id}/pessoas`)
  }

  create(mesa: Mesa) : Observable<Mesa> {
    return this.httpClient.post<Mesa>(`${this.apiUrl}`, mesa);
  }

  delete(id: number) : Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  adicionarMusica(idMesa: number, idMusica: number) : Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/adicionar/${idMesa}/musica/${idMusica}`, {});
  }

}
