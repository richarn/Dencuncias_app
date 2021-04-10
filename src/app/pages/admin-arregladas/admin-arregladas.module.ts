import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminArregladasPageRoutingModule } from './admin-arregladas-routing.module';

import { AdminArregladasPage } from './admin-arregladas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminArregladasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminArregladasPage]
})
export class AdminArregladasPageModule {}
