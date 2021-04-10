import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDenunciasPage } from './admin-denuncias.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDenunciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDenunciasPageRoutingModule {}
