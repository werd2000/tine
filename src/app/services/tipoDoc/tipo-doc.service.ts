import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoDocService {

  public tipoDoc = ['DNI', 'CI', 'LC', 'CUIL'];

  constructor() { }
}
