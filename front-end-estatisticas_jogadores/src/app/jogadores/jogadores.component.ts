import { Component, OnInit } from '@angular/core';
import { JogadoresService } from './jogadores.service';

@Component({
  selector: 'app-jogadores',
  templateUrl: './jogadores.component.html',
  styleUrls: ['./jogadores.component.css']
})
export class JogadoresComponent implements OnInit {

  nome_jogador: string = '';
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
    this.jogadoresService.adicionaJogador(this.nome_jogador)
      .subscribe({
        next:(res)=>{       
          alert('Jogador cadastrado com sucesso.');
          this.nome_jogador = '';
        },
        error:(error)=>{
          console.error('Erro ao cadastrar jogador:', error); 
        }
    }) 
  }

}
