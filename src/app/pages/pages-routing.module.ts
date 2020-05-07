import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const pagesRoutes: Routes = [
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
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
      path: 'profesionales',
      loadChildren: () => import('./profesionales/profesionales.module').then(m => m.ProfesionalesModule)
    },
    {
      path: 'profesionales/:id',
      loadChildren: () => import('./profesional/profesional.module').then(m => m.ProfesionalModule)
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
      path: 'formularios',
      loadChildren: () => import('./formularios/formularios.module').then(m => m.FormulariosModule)
    },
    {
      path: 'formularios/:id',
      loadChildren: () => import('./formulario/formulario.module').then(m => m.FormularioModule)
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
