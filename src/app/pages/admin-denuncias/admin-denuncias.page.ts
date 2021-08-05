import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { DenunciaService } from 'src/app/services/denuncia.service';
import { GeneralService } from 'src/app/services/general.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-denuncias',
  templateUrl: './admin-denuncias.page.html',
  styleUrls: ['./admin-denuncias.page.scss'],
})
export class AdminDenunciasPage implements OnInit {

  user;
  denuncias = [];
  denuncia;
  idDenuncia;

  recargaForm: FormGroup;
  scrolling: boolean = false;
  infScrollDisabled: boolean = false;

  constructor(
    private actionSheetController: ActionSheetController,
    private denunciaService: DenunciaService,
    private alertController: AlertController,
    private generalService: GeneralService,
    private userService: UserService,
    private router: Router,
  ) {}
  
  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
    this.obtenerDenuncias(null, {}, true);
  }

  ngOnInit() {}

  async obtenerDenuncias(event, query = {}, pull: boolean = false) {
    const response: any = await this.denunciaService.GetDenuncia(query, pull);

    if (response.ok) {
      this.denuncias.push(...response.body.data);
    }

    if (event) {
      event.target.complete();

      if (response.body.data.length === 0) { this.infScrollDisabled = true; }
    }

    this.scrolling = false;
    
  }

  
  redirectTo(denuncia) {
    this.router.navigate(['/tabs/detalle-denuncia'], { queryParams: { denuncia: denuncia.id }})
  }

  detalle(denuncia) {
    this.router.navigate(['/tabs/detalle-denuncia'], { queryParams: {denuncia: denuncia.id}})
  }
  
  async showOptions(denuncia) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          icon: "pencil",
          text: "Editar",
          handler: () => this.redirectTo(denuncia)
        },
        {
          icon: "trash",
          text: "Eliminar",
          handler: () => this.confirmarEliminacion(denuncia)
        }
      ]
    })

    await actionSheet.present();
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



  async eliminar(denuncia) {
    
    // petición get id de denuncia para eliminar la denuncia  
    const response: any = await this.denunciaService.eliminar(denuncia.id);
    
    if (response) {
      this.generalService.mostrarMensaje('Denuncia eliminada correctamente')
      this.obtenerDenuncias(null, {}, true);
    }
  }

  refresh(event) {
    this.denuncias = [];
    this.infScrollDisabled = false;
    this.obtenerDenuncias(event, {}, true);
  }

}
