import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminNoticiasPageRoutingModule } from './admin-noticias-routing.module';

import { AdminNoticiasPage } from './admin-noticias.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminNoticiasPageRoutingModule,
    ComponentsModule,
    PipesModule,
    ReactiveFormsModule
  ],
  declarations: [AdminNoticiasPage]
})
export class AdminNoticiasPageModule {}
