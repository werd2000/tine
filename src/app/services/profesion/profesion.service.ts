import { Injectable } from '@angular/core';
import { PersonalService } from '../personal/personal.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesionService {

  constructor(
    public personalService: PersonalService,
  ) {
  }

  guardarProfesion(idPersona: string, tipo: string, data: any) {
    // if (tipo === 'empleado') {
      return this.personalService.updateProfesion(data, idPersona);
    // }
  }

}
