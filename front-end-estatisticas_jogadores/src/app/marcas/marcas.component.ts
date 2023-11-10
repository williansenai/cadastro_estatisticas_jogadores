import { Component, OnInit } from '@angular/core';
import { CompartilhamentoService } from '../compartilhamento.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  pesquisaMarca: string = '';
  nome_marca: string = '';  
  marcas: any;
  marca: any;

  constructor(private compartilhamentoService: CompartilhamentoService) { }
 
  ngOnInit(): void {
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

  buscarMarca() {
    if (this.pesquisaMarca) {
      this.compartilhamentoService.listaMarca(this.pesquisaMarca)
        .subscribe({
          next: (res) => {
            this.marca = res; 
          },
          error: (error) => {
            console.error('Erro ao obter marca:', error);
          }
        });
    }
  }
  
  adicionaMarca() {
    const novaMarca = {
      nomeMarca: this.nome_marca
    };
  
    this.compartilhamentoService.adicionaMarca(novaMarca)
      .subscribe({
        next: (res) => {       
          alert('Marca cadastrada com sucesso.');
          this.nome_marca = '';          
        },
        error: (error) => {
          console.error('Erro ao cadastrar marca:', error); 
        }
      });
  }

}
