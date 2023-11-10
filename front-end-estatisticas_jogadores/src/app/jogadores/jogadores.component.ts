import { Component, OnInit } from '@angular/core';
import { JogadoresService } from './jogadores.service';

@Component({
  selector: 'app-jogadores',
  templateUrl: './jogadores.component.html',
  styleUrls: ['./jogadores.component.css']
})
export class JogadoresComponent implements OnInit {

  pesquisaJogador: string = '';
  nome_jogador: string = '';
  sport: string = '';
  stats: string = '';
  playerStats: any;

  constructor(private jogadoresService: JogadoresService) { }
 
  ngOnInit(): void {
  }

  listaEstatisticasTodosJogadores() {
    this.jogadoresService.listaEstatisticasTodosJogadores()
      .subscribe({
        next: (res) => {
          this.playerStats = res; // Assumindo que a resposta contém um array de estatísticas
        },
        error: (error) => {
          console.error('Erro ao obter estatísticas de todos os jogadores:', error);
        }
      });
  }

  buscarEstatisticasJogador() {
    if (this.pesquisaJogador) {
      this.jogadoresService.listaEstatisticasJogador(this.pesquisaJogador)
        .subscribe({
          next: (res) => {
            this.playerStats = res; // Assumindo que a resposta contém as estatísticas do jogador
          },
          error: (error) => {
            console.error('Erro ao obter estatísticas do jogador:', error);
          }
        });
    }
  }
  
  adicionaJogador() {
    const novoJogador = {
      name: this.nome_jogador,
      sport: this.sport,
      stats: this.stats
    };
  
    this.jogadoresService.adicionaJogador(novoJogador)
      .subscribe({
        next: (res) => {       
          alert('Jogador cadastrado com sucesso.');
          this.nome_jogador = '';
          this.sport = '';
          this.stats = '';
        },
        error: (error) => {
          console.error('Erro ao cadastrar jogador:', error); 
        }
      });
  }

}
