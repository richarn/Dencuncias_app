import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultadosPage } from './resultados.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ResultadosPageRoutingModule } from './resultados-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ResultadosPage }]),
    ResultadosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ResultadosPage]
})
export class ResultadosPageModule {}
