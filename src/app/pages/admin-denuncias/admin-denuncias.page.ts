import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { DenunciaService } from 'src/app/services/denuncia.service';


@Component({
  selector: 'app-admin-denuncias',
  templateUrl: './admin-denuncias.page.html',
  styleUrls: ['./admin-denuncias.page.scss'],
})
export class AdminDenunciasPage implements OnInit {

  denuncias = [];

  idDenuncia;
  constructor(
    private popoverCtrl: PopoverController,
    private denunciasService: DenunciaService,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
  ) {

    this.activeRoute.queryParams.subscribe(params => {
      console.log(params);
      if (params.denuncia) {
        this.idDenuncia = params.denuncia;
      }
    });
    this.obtenerDenuncias();
   }

  ngOnInit() {
  }

  async obtenerDenuncias() {
    const query = {estado: 1};
    const response: any = await this.denunciasService.GetDenuncia(query);

    if (response.success) {
      this.denuncias = response.denuncias;
    }
  }

  redirectTo(denuncia) {
    this.router.navigate(['/detalle-denuncia'], { queryParams: { denuncia: denuncia.id }})
  }

}
