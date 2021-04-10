import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerdenunciasPage } from './verdenuncias.page';

const routes: Routes = [
  {
    path: '',
    component: VerdenunciasPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerdenunciasPageRoutingModule {}
