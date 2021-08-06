import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { DenunciaService } from 'src/app/services/denuncia.service';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-denuncias',
  templateUrl: './user-denuncias.page.html',
  styleUrls: ['./user-denuncias.page.scss'],
})
export class UserDenunciasPage implements OnInit {

  user;
  idDenuncia;
  denuncias = [];

  scrolling = false;
  infScrollDisabled: boolean = false;

  constructor(
    private denunciasService: DenunciaService,
    private alertController: AlertController,
    private generalService: GeneralService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { 
    this.activeRoute.queryParams.subscribe(params => {
      if (params.denuncia) {
        this.idDenuncia = params.denuncia;
      }
    });
  }

  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
    this.refresh(null);
   }

  ngOnInit() {
  }

  async obtenerDenuncias(event, query = {}, pull: boolean = false) {
    if (this.user) query['usuario'] = this.user.id;

    const response: any = await this.denunciasService.GetDenuncia(query);
    if (response.ok) {
      this.denuncias.push(...response.body.data);
    }

    if (event) {
      event.target.complete();

      if (response.body.data.length === 0) { this.infScrollDisabled = true; }
    }

    this.scrolling = false;
    
  }

  detalle(denuncia) {
    this.router.navigate(['/tabs/detalle-denuncia'], { queryParams: {denuncia: denuncia.id}})
  }

    async confirmarEliminacion(denuncia) {
    
    const alert = this.alertController.create({
      header: 'Confirmar eliminacion',
      subHeader: '¿Estas seguro de continuar?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => this.eliminar(denuncia)
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

  agregarDenuncia() {
    this.router.navigate(['/tabs/denuncias'])
  }

  async eliminar(denuncia) {
    
    // petición get id de denuncia para eliminar la denuncia  
    const response: any = await this.denunciasService.eliminar(denuncia.id);
    
    if (response) {
      this.generalService.mostrarMensaje('Denuncia eliminada correctamente');
      this.obtenerDenuncias(null, {}, true);
    }
  }
  refresh(event) {
    this.denuncias = [];
    this.infScrollDisabled = false;
    this.obtenerDenuncias(event, {}, true);
  }

}





