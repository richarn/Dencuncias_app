import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleDenunciaPageRoutingModule } from './detalle-denuncia-routing.module';

import { DetalleDenunciaPage } from './detalle-denuncia.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleDenunciaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalleDenunciaPage]
})
export class DetalleDenunciaPageModule {}
