import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDenunciasPage } from './user-denuncias.page';

const routes: Routes = [
  {
    path: '',
    component: UserDenunciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDenunciasPageRoutingModule {}
