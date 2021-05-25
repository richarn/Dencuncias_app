import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-admin-denuncias',
  templateUrl: './admin-denuncias.page.html',
  styleUrls: ['./admin-denuncias.page.scss'],
})
export class AdminDenunciasPage implements OnInit {

  user;
  denuncias = [];

  idDenuncia;
  constructor(
    private popoverCtrl: PopoverController,
    private denunciasService: DenunciaService,
    private userService: UserService,
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

   async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
   }

  ngOnInit() {
  }

  async obtenerDenuncias() {
    const response: any = await this.denunciasService.GetDenuncia();

    if (response.success) {
      this.denuncias = response.data;
    }
  }

  redirectTo(denuncia) {
    this.router.navigate(['/detalle-denuncia'], { queryParams: { denuncia: denuncia.id }})
  }

}
