import { Injectable } from '@angular/core';
import { PacienteService } from '../paciente/paciente.service';
import { PersonalService } from '../personal/personal.service';


@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(
    public pacienteService: PacienteService,
    public personalService: PersonalService,
  ) { }

  guardarContacto(idPersona: string, tipo: string, data: any) {
    if (tipo === 'paciente') {
      return this.pacienteService.updateContactos(data, idPersona);
    }
    if (tipo === 'profesional') {
      return this.personalService.updateContactos(data, idPersona);
    }
  }
}