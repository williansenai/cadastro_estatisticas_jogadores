import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompartilhamentoService {

  private apiUrlJogadores = 'http://localhost:3000/jogadores';
  private apiUrlMarcas = 'http://localhost:3000/marcas'; 

  constructor(private http: HttpClient) { }

  // jogadores
  listaEstatisticasJogador(nomeJogador: string): Observable<any> {
    const url = `${this.apiUrlJogadores}?nome=${nomeJogador}`;
    return this.http.get(url);
  }

  listaEstatisticasTodosJogadores(): Observable<any> {
    return this.http.get(`${this.apiUrlJogadores}`);
  }

  adicionaJogador(novoJogador: any): Observable<any> {   
    return this.http.post(this.apiUrlJogadores, novoJogador);
  }

  // marcas
  listaMarca(nomeMarca: string): Observable<any> {
    const url = `${this.apiUrlMarcas}?nomeMarca=${nomeMarca}`;
    return this.http.get(url);
  }

  listaMarcas(): Observable<any> {
    return this.http.get(`${this.apiUrlMarcas}`);
  }

  adicionaMarca(novaMarca: any): Observable<any> {   
    return this.http.post(this.apiUrlMarcas, novaMarca);
  }
}
