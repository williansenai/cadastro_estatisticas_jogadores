import { Component, OnInit } from '@angular/core';
import { CompartilhamentoService } from '../compartilhamento.service';

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
  jogadoresEstatisticas: any;
  jogadorEstatistica: any;
  marcas: any;
  mostrarCadastrarJogador = false;

  

  constructor(private compartilhamentoService: CompartilhamentoService) { }
 
  ngOnInit(): void {
    this.listaMarcas();
  }

  listaEstatisticasTodosJogadores() {
    this.compartilhamentoService.listaEstatisticasTodosJogadores()
      .subscribe({
        next: (res) => {
          this.jogadoresEstatisticas = res;
          this.jogadorEstatistica = false;
          this.mostrarCadastrarJogador = false;
        },
        error: (error) => {
          console.error('Erro ao obter estatísticas de todos os jogadores:', error);
        }
      });
  }

  pesquisarJogadorEspecifico()
  {
    this.mostrarCadastrarJogador = false;
    this.jogadoresEstatisticas = false;
    this.jogadorEstatistica = true;
  }

  cadastrarNovoJogador()
  {
    this.jogadoresEstatisticas = false;
    this.jogadorEstatistica = false;
    this.mostrarCadastrarJogador = true;
  }

  buscarEstatisticasJogador() {
    if (this.pesquisaJogador) {
      this.compartilhamentoService.listaEstatisticasJogador(this.pesquisaJogador)
        .subscribe({
          next: (res) => {
            this.jogadorEstatistica = res; 
          },
          error: (error) => {
            console.error('Erro ao obter estatísticas do jogador:', error);
          }
        });
    }
  }
  
  adicionaJogador() {
    const novoJogador = {
      nome: this.nome_jogador,
      sport: this.sport,
      stats: this.stats
    };
  
    this.compartilhamentoService.adicionaJogador(novoJogador)
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

  listaMarcas() {
    this.compartilhamentoService.listaMarcas()
      .subscribe({
        next: (res) => {
          this.marcas = res; 
        },
        error: (error) => {
          console.error('Erro ao obter marcas', error);
        }
      });
  }

}
