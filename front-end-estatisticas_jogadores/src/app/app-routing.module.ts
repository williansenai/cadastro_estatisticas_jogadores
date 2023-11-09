import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JogadoresComponent } from './jogadores/jogadores.component';

const routes: Routes = [
  {
    path: '',
    component: JogadoresComponent,
    pathMatch: 'full',    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
