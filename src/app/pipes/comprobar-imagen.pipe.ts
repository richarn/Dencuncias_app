import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.host;

@Pipe({
  name: 'comprobarImagen'
})
export class ComprobarImagenPipe implements PipeTransform {

  transform(imagenes: any[], index: number = 0): string {
    let url = 'assets/images/no-image.jpg';

    if (imagenes && imagenes.length) {
      url = `${API}${imagenes[index].url}`;
    }

    return url;
  }

}
