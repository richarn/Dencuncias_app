import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminInicioPageRoutingModule } from './admin-inicio-routing.module';

import { AdminInicioPage } from './admin-inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminInicioPageRoutingModule
  ],
  declarations: [AdminInicioPage]
})
export class AdminInicioPageModule {}
