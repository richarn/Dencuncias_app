import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detalle-denuncia',
  templateUrl: './detalle-denuncia.page.html',
  styleUrls: ['./detalle-denuncia.page.scss'],
})
export class DetalleDenunciaPage implements OnInit {
  user;
  idDenuncia;
  denuncia;
  constructor(
    private denunciasService: DenunciaService,
    private alertController: AlertController,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { 
    this.activeRoute.queryParams.subscribe(params => {
      console.log(params);
      if (params.denuncia) {
        this.idDenuncia = params.denuncia;
        this.obtenerDenuncias();
      }
    });
  }

  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.user();
    console.log('user: ', this.user);
    
   }

  ngOnInit() {
  }

  async obtenerDenuncias() {
    //const query = {estado: 1};
    console.log('antes peticion: ', this.denuncia);
    
    const response: any = await this.denunciasService.obtenerId(this.idDenuncia);
    console.log(this.idDenuncia);
    
    if (response.success) {
      console.log(typeof response.data);
      
      this.denuncia = response.data;
      console.log('despues peticion: ', this.denuncia);
    }
  }

  async confirmar() {
    const alert = this.alertController.create({
      header: 'Confirmar denuncia',
      subHeader: '¿Estas seguro de continuar?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => this.confirmarDenuncia()
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        }
      ]
    })

    return (await alert).present();
  }

  async confirmarDenuncia() {
    // petición PUT para actualizar el estado de la denuncia
    this.denuncia.estado = 1;
    
  }

}
