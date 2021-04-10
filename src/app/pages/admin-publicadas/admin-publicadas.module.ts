import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPublicadasPageRoutingModule } from './admin-publicadas-routing.module';

import { AdminPublicadasPage } from './admin-publicadas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPublicadasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminPublicadasPage]
})
export class AdminPublicadasPageModule {}
