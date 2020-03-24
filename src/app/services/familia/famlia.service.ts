import { Injectable } from '@angular/core';
import { PacienteService } from '../paciente/paciente.service';
import { PersonalService } from '../personal/personal.service';


@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  constructor(
    public pacienteService: PacienteService,
    public personalService: PersonalService,
  ) { }

  guardarFamilia(idPersona: string, tipo: string, data: any) {
    if (tipo === 'paciente') {
      return this.pacienteService.updateFamilia(data, idPersona);
    }
    if (tipo === 'profesional') {
      return this.personalService.updateFamilia(data, idPersona);
    }
  }
}
