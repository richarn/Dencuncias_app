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
import { PreviewImagesComponent } from './preview-images/preview-images.component';
import { CardDenunciaComponent } from './card-denuncia/card-denuncia.component';
import { CardUserComponent } from './card-user/card-user.component';


@NgModule({
  declarations: [
    HeaderComponent,
    PopinfoComponent,
    MapaComponent,
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
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
