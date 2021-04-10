import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDenunciasPageRoutingModule } from './admin-denuncias-routing.module';

import { AdminDenunciasPage } from './admin-denuncias.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDenunciasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminDenunciasPage]
})
export class AdminDenunciasPageModule {}
