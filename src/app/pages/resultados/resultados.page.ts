import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resultados',
  templateUrl: 'resultados.page.html',
  styleUrls: ['resultados.page.scss']
})
export class ResultadosPage {

  idDenuncia;
  user;
  denuncias = [
    { fecha_denuncia: '06/07/2021 08:50', barrio: 'Kennedy', estado:'pendiente',descripcion: 'Denuncia 1' },
    { fecha_denuncia: '07/07/2021 15:13', barrio: 'Loma', estado:'en proceso',descripcion: 'Denuncia 2' },
    { fecha_denuncia: '08/07/2021 10:40', barrio: 'Azcurra', estado:'en proceso',descripcion: 'Denuncia 3' },
    { fecha_denuncia: '09/07/2021 12:07', barrio: 'Alegre', estado:'finalizado',descripcion: 'Denuncia 4' },
    { fecha_denuncia: '10/07/2021 16:14', barrio: 'Cerro Real', estado:'finalizado',descripcion: 'Denuncia 5' },
    { fecha_denuncia: '11/07/2021 21:45', barrio: 'Costa Puku', estado:'finalizado',descripcion: 'Denuncia 6' },
  ];

  constructor(
    private denunciaService: DenunciaService,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private userService: UserService

  ) {
    this.activeRoute.queryParams.subscribe(params => {
      console.log(params);
      if (params.denuncia) {
        this.idDenuncia = params.denuncia;
      }
    });
  }

  async ionViewWillEnter() {
    this.user = await this.userService.getUser();
   // this.obtenerDenuncia();
  }

  ngOnInit() {
  }

  async obtenerDenuncia() {
    const query = { estado: 2 }
    const response: any = await this.denunciaService.GetDenuncia(query);
    if (response.success) {
      this.denuncias = response.data;
    }
  }

  redirectTo(denuncia) {
    this.router.navigate(['/tabs/detalle-denuncia'], { queryParams: { denuncia: denuncia.id } });
  }

  onClick() {
    this.navCtrl.navigateBack('/');
  }
}
