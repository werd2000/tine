import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SexoService {

  public sexos = ['VARON', 'MUJER'];

  constructor() { }
}
