import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verdenuncias',
  templateUrl: 'verdenuncias.page.html',
  styleUrls: ['verdenuncias.page.scss']
})
export class VerdenunciasPage {

  idDenuncia;
  user;
  denuncias = [];

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

    this.obtenerDenuncias();
  }


  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
   }

  ngOnInit() {
  }

  async obtenerDenuncias() {
    const query = {estado: 1};
    const response: any = await this.denunciaService.GetDenuncia(query);
    if (response.success) {
      this.denuncias = response.data;
    }
    console.log("denuncias:", this.denuncias);
    
  }

  redirectTo(denuncia) {
    this.router.navigate(['/detalle-denuncia'], { queryParams: { denuncia: denuncia.id }});
  }
 
  userDenuncia(){
    this.router.navigate(['/user-denuncias']);
  }
  
  onClick(){
    this.navCtrl.navigateBack('/');
  }

}
