import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-content',
  template: `
    <h2>Marcas Usadas por {{ data.jogador.nome }}</h2>
    <!-- Adicione o conteúdo do modal conforme necessário -->
  `
})
export class ModalContentComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
