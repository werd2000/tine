import { Injectable } from '@angular/core';
import { Countries } from 'src/app/globals/countries.enum';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor() { }

  getPaises() {
    return Object.keys(Countries).map(key => {
        return {
          id: Countries[key],
          name: key,
        };
      });
  }
}
