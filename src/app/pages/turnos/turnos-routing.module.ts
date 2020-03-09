import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TurnosComponent } from './turnos.component';


const routes: Routes = [
  {
    path: '',
    component: TurnosComponent,
    data: { title: 'Turnos del día' }
  },
  {
    path: '/:idProf',
    component: TurnosComponent,
    data: { title: 'Turnos del día' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
