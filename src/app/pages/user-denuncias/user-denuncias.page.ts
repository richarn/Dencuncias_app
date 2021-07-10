import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-denuncias',
  templateUrl: './user-denuncias.page.html',
  styleUrls: ['./user-denuncias.page.scss'],
})
export class UserDenunciasPage implements OnInit {

  user;
  idDenuncia;
  denuncias;

  constructor(
    private denunciasService: DenunciaService,
    private alertController: AlertController,
    private toastController: ToastController,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { 
    this.activeRoute.queryParams.subscribe(params => {
      console.log(params);
      if (params.denuncia) {
        this.idDenuncia = params.denuncia;
      }
    });
  }

  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
    this.obtenerDenuncias();
    console.log('usuario: ', this.user);
    
   }

  ngOnInit() {
  }

  async obtenerDenuncias() {
    const query = {};
    if (this.user) query['usuario'] = this.user.id;
    console.log('query', query);
    this.denunciasService.GetDenuncia(query);
    const response: any = await this.denunciasService.GetDenuncia(query);
    if (response.success) {
      this.denuncias = response.data;
    }
    console.log("denuncias:", this.denuncias);
    
  }

  detalle(denuncia) {
    this.router.navigate(['/tabs/detalle-denuncia'], { queryParams: {denuncia: denuncia.id}})
  }

}





