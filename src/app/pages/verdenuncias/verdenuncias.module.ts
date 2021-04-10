import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VerdenunciasPage } from './verdenuncias.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { VerdenunciasPageRoutingModule } from './verdenuncias-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    VerdenunciasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VerdenunciasPage]
})
export class VerdenunciasPageModule {}
