import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultadosPage } from './resultados.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ResultadosPageRoutingModule } from './resultados-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ResultadosPage }]),
    ResultadosPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [ResultadosPage]
})
export class ResultadosPageModule {}
