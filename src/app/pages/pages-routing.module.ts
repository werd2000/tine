import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { DashboardComponent } from './dashboard/components/dashboard.component';



const pagesRoutes: Routes = [
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      // component: DashboardComponent,
      data: { title: 'Dashboard' }
    },
    {
      path: 'pacientes',
      loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule)
    },
    {
      path: 'pacientes/:id',
      loadChildren: () => import('./paciente/paciente.module').then(m => m.PacienteModule)
    },
    {
      path: 'turnos',
      loadChildren: () => import('./turnos/turnos.module').then(m => m.TurnosModule)
    },
    {
      path: 'turnos/:idProf',
      loadChildren: () => import('./turnos/turnos.module').then(m => m.TurnosModule)
    },
    {
      path: '',
      redirectTo: '/dashboard',
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
