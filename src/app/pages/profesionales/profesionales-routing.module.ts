import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfesionalesComponent } from './profesionales.component';


const routes: Routes = [
  {
    path: '',
    component: ProfesionalesComponent,
    data: { title: 'Lista de Profesionales' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesionalesRoutingModule { }
