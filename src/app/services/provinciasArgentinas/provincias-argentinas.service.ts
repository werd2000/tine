import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasArgentinasService {

  constructor(
    private http: HttpClient
  ) { }

  getProvincias() {
    return this.http.get('https://apis.datos.gob.ar/georef/api/provincias')
      .pipe( map( (resp: any) => {
        return resp.provincias.map( (provincia: any) => {
          return {
            nombre: provincia.nombre,
            id: provincia.id
          };
        });
      }
      ));
  }
}
