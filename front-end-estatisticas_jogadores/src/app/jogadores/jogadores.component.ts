import { Component, OnInit } from '@angular/core';
import { JogadoresService } from './jogadores.service';

@Component({
  selector: 'app-jogadores',
  templateUrl: './jogadores.component.html',
  styleUrls: ['./jogadores.component.css']
})
export class JogadoresComponent implements OnInit {

  nome_jogador: string = '';
  sport: string = '';
  stats: string = '';
  playerStats: any;

  constructor(private jogadoresService: JogadoresService) { }
 
  ngOnInit(): void {
  }

  listaEstatisticasJogador(jogador: string) {
    this.jogadoresService.listaEstatisticasJogador(jogador)
      .subscribe((data) => {
        if (data.length > 0) {
          this.playerStats = data[0].stats;
        } else {
          this.playerStats = 'Nenhuma estatística encontrada para ' + this.nome_jogador;
        }
      });
  }
  
  adicionaJogador() {
    const novoJogador = {
      nome: this.nome_jogador,
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
