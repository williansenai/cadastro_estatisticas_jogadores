import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JogadoresService {

  private apiUrl = 'http://localhost:3000/jogadores'; 

  constructor(private http: HttpClient) { }

  listaEstatisticasJogador(jogador: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?name=${jogador}`);
  }

  adicionaJogador(nome_jogador: string): Observable<any> {
    const dados_jogador = { name: nome_jogador };
    return this.http.post(this.apiUrl, dados_jogador);
  }
}
