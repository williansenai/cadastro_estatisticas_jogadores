import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JogadoresComponent } from './jogadores/jogadores.component';
import { MarcasComponent } from './marcas/marcas.component';

const routes: Routes = [
  {
    path: '',
    component: JogadoresComponent,
    pathMatch: 'full',    
  },
  {
    path: 'marcas',
    component: MarcasComponent,
    pathMatch: 'full',    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
