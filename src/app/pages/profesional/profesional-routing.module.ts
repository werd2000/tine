import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfesionalComponent } from './profesional.component';


const routes: Routes = [
  {
    path: '',
    component: ProfesionalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesionalRoutingModule { }
