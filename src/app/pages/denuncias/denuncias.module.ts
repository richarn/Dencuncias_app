import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DenunciasPage } from './denuncias.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { DenunciasPageRoutingModule } from './denuncias-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    DenunciasPageRoutingModule,
    ComponentsModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  declarations: [DenunciasPage]
})
export class DenunciasPageModule {}
