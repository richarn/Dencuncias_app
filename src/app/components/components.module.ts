import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { IonicModule } from '@ionic/angular';
import { PopinfoComponent } from './popinfo/popinfo.component';
import { MapaComponent } from './mapa/mapa.component';
import { PipesModule } from '../pipes/pipes.module';
import { SelectImageComponent } from './select-image/select-image.component';


@NgModule({
  declarations: [
    HeaderComponent,
    PopinfoComponent,
    MapaComponent,
    AdminHeaderComponent,
    SelectImageComponent,
  
  ],

  exports: [
    HeaderComponent,
    PopinfoComponent,
    MapaComponent,
    AdminHeaderComponent,
    SelectImageComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
