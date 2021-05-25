import { Pipe, PipeTransform } from '@angular/core';

import { environment } from 'src/environments/environment';

const API = environment.host;

@Pipe({
  name: 'formatearImagen'
})
export class ImagePipe implements PipeTransform {

  transform(imagen: any): string {
    let url = 'assets/images/no-image.jpg';

    if (imagen) {
      url = `${API}${imagen.url}`;
    }

    return url;
  }
}
