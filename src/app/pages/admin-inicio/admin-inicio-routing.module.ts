import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminInicioPage } from './admin-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: AdminInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminInicioPageRoutingModule {}
