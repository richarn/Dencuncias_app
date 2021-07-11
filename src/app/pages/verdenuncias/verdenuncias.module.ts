import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerdenunciasPage } from './verdenuncias.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { VerdenunciasPageRoutingModule } from './verdenuncias-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    VerdenunciasPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [VerdenunciasPage]
})
export class VerdenunciasPageModule {}
