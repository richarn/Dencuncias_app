import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ComprobarImagenPipe } from './comprobar-imagen.pipe';
import { ImagePipe } from './image.pipe';
import { FormatDatePipe } from './format-date.pipe';

@NgModule({
  declarations: [ImageSanitizerPipe, DomSanitizerPipe, ComprobarImagenPipe, ImagePipe, FormatDatePipe],
  exports: [
    ComprobarImagenPipe,
    DomSanitizerPipe,
    ImageSanitizerPipe,
    FormatDatePipe,
    ImagePipe
  ]
})
export class PipesModule { }
