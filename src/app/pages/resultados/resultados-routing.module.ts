import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadosPage } from './resultados.page';

const routes: Routes = [
  {
    path: '',
    component: ResultadosPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadosPageRoutingModule {}
