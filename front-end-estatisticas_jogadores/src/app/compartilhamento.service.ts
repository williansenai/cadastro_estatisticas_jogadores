import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompartilhamentoService {

  private apiUrlJogadores = 'http://localhost:3000/jogadores';
  private apiUrlMarcas = 'http://localhost:3000/marcas'; 
  private apiUrlMarcasAosJogadores = 'http://localhost:3000/marcasAosJogadores';
  

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

  // marcas ao jogador  
  adicionaMarcaAoJogador(novaMarcaAoJogador: any): Observable<any> {   
    return this.http.post(this.apiUrlMarcasAosJogadores, novaMarcaAoJogador);
  }

  listaMarcasDoJogador(idJogador: number): Observable<any> {
    const urlMarcasAosJogadores = `${this.apiUrlMarcasAosJogadores}?idJogador=${idJogador}`;
    const urlMarcas = `${this.apiUrlMarcas}`;

    // Utiliza o forkJoin para realizar as duas chamadas simultaneamente
    return forkJoin([
      this.http.get(urlMarcasAosJogadores),
      this.http.get(urlMarcas)
    ]);
  }  
}
