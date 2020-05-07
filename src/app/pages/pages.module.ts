import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Mis m'odulos
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';

// Componentes
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PacientePrincipalComponent } from '../componentes/forms/paciente-principal/paciente-principal.component';
import { TurnosComponent } from './turnos/turnos.component';
import { AddTurnoComponent } from './turnos/add-turno.component';
import { DomicilioComponent } from '../componentes/forms/domicilio/domicilio.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { ProfesionalComponent } from './profesional/profesional.component';
import { ProfesionalPrincipalComponent } from '../componentes/forms/profesional-principal/profesional-principal.component';
import { ProfesionComponent } from '../componentes/forms/profesion/profesion.component';
import { ContactoComponent } from '../componentes/forms/contacto/contacto.component';
import { FamiliaComponent } from '../componentes/forms/familia/familia.component';
import { FormulariosComponent } from './formularios/formularios.component';
import { FormularioComponent } from './formulario/formulario.component';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    DashboardComponent,
    PacienteComponent,
    PacientesComponent,
    PacientePrincipalComponent,
    TurnosComponent,
    AddTurnoComponent,
    DomicilioComponent,
    ProfesionalesComponent,
    ProfesionalComponent,
    ProfesionalPrincipalComponent,
    ProfesionComponent,
    ContactoComponent,
    FamiliaComponent,
    FormulariosComponent,
    FormularioComponent
  ],
  exports: [
    DashboardComponent,
    PacienteComponent,
    PacientesComponent,
    PacientePrincipalComponent,
    TurnosComponent,
    AddTurnoComponent,
    DomicilioComponent,
    ProfesionalesComponent,
    ProfesionalComponent,
    ProfesionalPrincipalComponent,
    ProfesionComponent,
    ContactoComponent,
    FamiliaComponent,
    FormulariosComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    FontAwesomeModule,
    SweetAlert2Module
  ]
})
export class PagesModule { }
