import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleDenunciaPage } from './detalle-denuncia.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleDenunciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleDenunciaPageRoutingModule {}
