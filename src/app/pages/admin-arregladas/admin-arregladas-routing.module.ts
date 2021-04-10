import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminArregladasPage } from './admin-arregladas.page';

const routes: Routes = [
  {
    path: '',
    component: AdminArregladasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminArregladasPageRoutingModule {}
