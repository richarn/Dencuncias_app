import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { IonicModule } from '@ionic/angular';
import { PopinfoComponent } from './popinfo/popinfo.component';
import { MapaComponent } from './mapa/mapa.component';
import { PipesModule } from '../pipes/pipes.module';
import { SelectImageComponent } from './select-image/select-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderSolucionadaComponent } from './header-solucionada/header-solucionada.component';
import { PreviewImagesComponent } from './preview-images/preview-images.component';


@NgModule({
  declarations: [
    HeaderComponent,
    PopinfoComponent,
    MapaComponent,
    AdminHeaderComponent,
    SelectImageComponent,
    PreviewImagesComponent,
    HeaderSolucionadaComponent
  ],

  exports: [
    HeaderComponent,
    PopinfoComponent,
    MapaComponent,
    AdminHeaderComponent,
    SelectImageComponent,
    PreviewImagesComponent,
    HeaderSolucionadaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
