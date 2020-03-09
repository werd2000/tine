import { Injectable } from '@angular/core';
import { PacienteService } from '../paciente/paciente.service';
import { PersonalService } from '../personal/personal.service';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService {

  constructor(
    private pacienteService: PacienteService,
    private personalService: PersonalService,
  ) { }

  guardarDomicilio(idPersona: string, tipo: string, data: any) {
    if (tipo === 'paciente') {
      return this.pacienteService.updateDomicilio(data, idPersona);
    }
    if (tipo === 'empleado') {
      // this.personalService.updatePersonal(persona);
    }
  }
}
