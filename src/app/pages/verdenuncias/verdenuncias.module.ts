import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VerdenunciasPage } from './verdenuncias.page';

import { VerdenunciasPageRoutingModule } from './verdenuncias-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PipesModule,
    ComponentsModule,
    ReactiveFormsModule,
    VerdenunciasPageRoutingModule,
  ],
  declarations: [VerdenunciasPage]
})
export class VerdenunciasPageModule {}
