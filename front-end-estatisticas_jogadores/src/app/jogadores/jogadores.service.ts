import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JogadoresService {

  private apiUrl = 'http://localhost:3000/jogadores'; 

  constructor(private http: HttpClient) { }

  listaEstatisticasJogador(nomeJogador: string): Observable<any> {
    const url = `${this.apiUrl}?name=${nomeJogador}`;
    return this.http.get(url);
  }

  listaEstatisticasTodosJogadores(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  adicionaJogador(novoJogador: any): Observable<any> {   
    return this.http.post(this.apiUrl, novoJogador);
  }
}
