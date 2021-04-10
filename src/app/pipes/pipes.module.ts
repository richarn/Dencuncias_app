import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ComprobarImagenPipe } from './comprobar-imagen.pipe';

@NgModule({
  declarations: [ImageSanitizerPipe, DomSanitizerPipe, ComprobarImagenPipe],
  exports: [
    ComprobarImagenPipe,
    DomSanitizerPipe,
    ImageSanitizerPipe
  ]
})
export class PipesModule { }
