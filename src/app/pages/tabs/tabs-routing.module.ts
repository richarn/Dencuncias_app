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
        path: '',
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'denuncias',
        // canActivate: [AuthGuard],
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
        path: 'admin-publicadas',
        canActivate: [AuthGuard],
        loadChildren: () => import('../admin-publicadas/admin-publicadas.module').then( m => m.AdminPublicadasPageModule)
      },
      {
        path: 'admin-arregladas',
        canActivate: [AuthGuard],
        loadChildren: () => import('../admin-arregladas/admin-arregladas.module').then( m => m.AdminArregladasPageModule)
      },     
      {
        path: 'admin-noticias',
        canActivate: [AuthGuard],
        loadChildren: () => import('../admin-noticias/admin-noticias.module').then( m => m.AdminNoticiasPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'registro',
        loadChildren: () => import('../registro/registro.module').then( m => m.RegistroPageModule)
      },
      {
        path: 'detalle-noticia',
        loadChildren: () => import('../detalle-noticia/detalle-noticia.module').then( m => m.DetalleNoticiaPageModule)
      },
      {
        path: 'detalle-denuncia',
        canActivate: [AuthGuard],
        loadChildren: () => import('../detalle-denuncia/detalle-denuncia.module').then( m => m.DetalleDenunciaPageModule)
      },
      {
        path: 'user-denuncias',
        canActivate: [AuthGuard],
        loadChildren: () => import('../user-denuncias/user-denuncias.module').then( m => m.UserDenunciasPageModule)
      },
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
