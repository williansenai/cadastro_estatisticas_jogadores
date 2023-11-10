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
  mostraMarcasDisponiveis = false;
  mostraPesquisaJogadorEstatistica = false;
  mostraMsgJogador404 = false;  
  jogadorSelecionado = "";

  constructor(private compartilhamentoService: CompartilhamentoService) { }
 
  ngOnInit(): void {
    this.listaMarcas();
  }

  listaEstatisticasTodosJogadores() {
    this.compartilhamentoService.listaEstatisticasTodosJogadores()
      .subscribe({
        next: (res) => {
          this.jogadoresEstatisticas = res;
          this.pesquisaJogador = "";
          this.mostraMarcasDisponiveis = false;
          this.jogadorEstatistica = false;
          this.mostrarCadastrarJogador = false;
          this.mostraPesquisaJogadorEstatistica = false;
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
    this.mostraPesquisaJogadorEstatistica = true;    
  }

  cadastrarNovoJogador()
  {
    this.jogadoresEstatisticas = false;
    this.jogadorEstatistica = false;
    this.mostraMarcasDisponiveis = false;
    this.pesquisaJogador = "";
    this.mostraPesquisaJogadorEstatistica = false;
    this.mostrarCadastrarJogador = true;
  }

  buscarEstatisticasJogador() {
    if (this.pesquisaJogador) {
      this.compartilhamentoService.listaEstatisticasJogador(this.pesquisaJogador)
        .subscribe({
          next: (res) => {
            if (res[0])
            {
              this.jogadorEstatistica = res;  
              this.mostraMsgJogador404 = false;
            }
            else 
            {
              this.mostraMsgJogador404 = true;
            }
            
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

  abreMarcasParaJogador(jogador: any)
  {
    this.mostraMarcasDisponiveis = true;
    this.jogadorSelecionado = jogador.nome;
    localStorage.setItem("jogadorSelecionado", JSON.stringify(jogador));
    
  }

  adicionaMarcaAoJogador(marca: any)
  {
    const jsonString = localStorage.getItem('jogadorSelecionado');

    if (jsonString)
    {
      try {       
        const jogadorSelecionado = JSON.parse(jsonString);

        const novaMarcaAoJogador = {
          idJogador: jogadorSelecionado.id,
          idMarca: marca.id
        };
      
        this.compartilhamentoService.adicionaMarcaAoJogador(novaMarcaAoJogador)
        .subscribe({
          next: (res) => {       
            alert('Marca Cadastrada para o Jogador '+jogadorSelecionado.nome+' com sucesso.');       
          },
          error: (error) => {
            console.error('Erro ao cadastrar marca ao jogador:', error); 
          }
        });

      } catch (error) {        
        console.error('Erro ao fazer o parsing da string JSON:', error);
      }  
    }  
  }

}
