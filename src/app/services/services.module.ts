import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from './paciente/paciente.service';
import { UsuarioService } from './usuario/usuario.service';
import { AuthenticationService } from './authentication/authentication.service';
import { PersonalService } from './personal/personal.service';
import { AreaService } from './area/area.service';
import { TurnoService } from './turno/turno.service';
import { TipoDocService } from './tipoDoc/tipo-doc.service';
import { SexoService } from './sexo/sexo.service';
import { PaisService } from './pais/pais.service';
import { DomicilioService } from './domicilio/domicilio.service';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [],
    declarations: [],
    providers: [
        PacienteService,
        UsuarioService,
        AuthenticationService,
        PersonalService,
        AreaService,
        TurnoService,
        TipoDocService,
        SexoService,
        PaisService,
        DomicilioService
    ],
})
export class ServicesModule { }
