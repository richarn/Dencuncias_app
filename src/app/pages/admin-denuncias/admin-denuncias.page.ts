import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController, PopoverController, ToastController } from '@ionic/angular';
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
  denuncia;
  idDenuncia;

  recargaForm: FormGroup;
  scrolling: boolean = false;
  infScrollDisabled: boolean = false;

  constructor(
    private actionSheetController: ActionSheetController,
    private denunciaService: DenunciaService,
    private alertController: AlertController,
    private toastController: ToastController,
    private popoverCtrl: PopoverController,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private navCtrl: NavController,
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

    if (response.success) {
      this.denuncias = response.data;
    }

    if (event) {
      event.target.complete();

      if (response.data.length === 0) { this.infScrollDisabled = true; }
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
      const toast = await this.toastController.create({
        message: 'Denuncia eliminada correctamente',
        duration: 2000
      });
      await toast.present();
      this.obtenerDenuncias(null, {}, true);
    }
  }

  refresh(event) {
    this.denuncias = [];
    this.infScrollDisabled = false;
    this.obtenerDenuncias(event, {}, true);
  }

}
