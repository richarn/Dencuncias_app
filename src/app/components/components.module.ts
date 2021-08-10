import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PreviewImagesComponent } from './preview-images/preview-images.component';
import { CardDenunciaComponent } from './card-denuncia/card-denuncia.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { SelectImageComponent } from './select-image/select-image.component';
import { CardUserComponent } from './card-user/card-user.component';
import { PopinfoComponent } from './popinfo/popinfo.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { HeaderComponent } from './header/header.component';
import { MapaComponent } from './mapa/mapa.component';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    HeaderComponent,
    PopinfoComponent,
    MapaComponent,
    FiltrosComponent,
    AdminHeaderComponent,
    SelectImageComponent,
    PreviewImagesComponent,
    CardDenunciaComponent,
    CardUserComponent,
  ],
  exports: [
    HeaderComponent,
    PopinfoComponent,
    MapaComponent,
    FiltrosComponent,
    AdminHeaderComponent,
    SelectImageComponent,
    PreviewImagesComponent,
    CardDenunciaComponent,
    CardUserComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
