import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'denuncias',
        canActivate: [AuthGuard],
        loadChildren: () => import('../denuncias/denuncias.module').then(m => m.DenunciasPageModule)
      },
      {
        path: 'verdenuncias',
        loadChildren: () => import('../verdenuncias/verdenuncias.module').then(m => m.VerdenunciasPageModule)
      },
      {
        path: 'resultados',
        loadChildren: () => import('../resultados/resultados.module').then(m => m.ResultadosPageModule)
      },
      {
        path:'admin-inicio',
        canActivate: [AuthGuard],
        loadChildren: () => import('../admin-inicio/admin-inicio.module').then(m => m.AdminInicioPageModule)
      },
      {
        path: 'admin-denuncias',
        canActivate: [AuthGuard],
        loadChildren: () => import('../admin-denuncias/admin-denuncias.module').then( m => m.AdminDenunciasPageModule)
      },
      {
        path: 'admin-noticias',
        canActivate: [AuthGuard],
        loadChildren: () => import('../admin-noticias/admin-noticias.module').then( m => m.AdminNoticiasPageModule)
      },
      {
        path: 'detalle-noticia',
        loadChildren: () => import('../detalle-noticia/detalle-noticia.module').then( m => m.DetalleNoticiaPageModule)
      },
      {
        path: 'detalle-denuncia',
        // canActivate: [AuthGuard],
        loadChildren: () => import('../detalle-denuncia/detalle-denuncia.module').then( m => m.DetalleDenunciaPageModule)
      },
      {
        path: 'user-denuncias',
        canActivate: [AuthGuard],
        loadChildren: () => import('../user-denuncias/user-denuncias.module').then( m => m.UserDenunciasPageModule)
      },
      {
        path: 'admin-user',
        canActivate: [AuthGuard],
        loadChildren: () => import('../admin-user/admin-user.module').then( m => m.AdminUserPageModule)
      },
      {
        path: 'detalle-usuario',
        canActivate: [AuthGuard],
        loadChildren: () => import('../detalle-usuario/detalle-usuario.module').then( m => m.DetalleUsuarioPageModule)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
