import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleNoticiaPageRoutingModule } from './detalle-noticia-routing.module';

import { DetalleNoticiaPage } from './detalle-noticia.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    DetalleNoticiaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalleNoticiaPage]
})
export class DetalleNoticiaPageModule {}
