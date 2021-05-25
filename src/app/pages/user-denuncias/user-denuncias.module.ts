import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDenunciasPageRoutingModule } from './user-denuncias-routing.module';

import { UserDenunciasPage } from './user-denuncias.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDenunciasPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [UserDenunciasPage]
})
export class UserDenunciasPageModule {}
