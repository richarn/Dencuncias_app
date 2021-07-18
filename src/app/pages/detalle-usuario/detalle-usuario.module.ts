import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleUsuarioPageRoutingModule } from './detalle-usuario-routing.module';

import { DetalleUsuarioPage } from './detalle-usuario.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleUsuarioPageRoutingModule,
    PipesModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [DetalleUsuarioPage]
})
export class DetalleUsuarioPageModule {}
