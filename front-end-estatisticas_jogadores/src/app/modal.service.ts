import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalContentComponent } from './modal-content/modal-content.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openModal(jogador: any) {
    console.log('Abrindo o modal para o jogador:', jogador);
    this.dialog.open(ModalContentComponent, {
      data: { jogador }
    });
  }
}
