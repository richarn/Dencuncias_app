import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'detalleDenuncia'
})
export class DetalleDenunciaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
