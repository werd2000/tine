import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = 'assets/images/users/';

    if (!img) {
      return url + 'no-img.png';
    }

    if (img.indexOf('https') >= 0 ) {
      return img;
    }



    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'profesional':
        url += '/profesionales/' + img;
        break;
      case 'centros_medicos':
        url += '/centros_medicos/' + img;
        break;
      default:
      console.log('Tipo de imagen no válida. Usuario, Profesional, Centro Médico');
      url += '/usuario/xxx';
    }

    return url;
  }

}
