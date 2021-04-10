import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPublicadasPage } from './admin-publicadas.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPublicadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPublicadasPageRoutingModule {}
