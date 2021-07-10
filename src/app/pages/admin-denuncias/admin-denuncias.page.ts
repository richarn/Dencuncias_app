import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, PopoverController, ToastController } from '@ionic/angular';
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
  constructor(
    private popoverCtrl: PopoverController,
    private denunciaService: DenunciaService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {

    
  }
  
  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
    this.obtenerDenuncias();
    
  }

  ngOnInit() {
    this.obtenerDenuncias();
  }

  async obtenerDenuncias() {
    const response: any = await this.denunciaService.GetDenuncia();

    if (response.success) {
      this.denuncias = response.data;
    }
    
  }

  
  redirectTo(denuncia) {
    this.router.navigate(['/tabs/detalle-denuncia'], { queryParams: { denuncia: denuncia.id }})
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



  async eliminar(denuncia) {
    
    // petición get id de denuncia para eliminar la denuncia  
    const response: any = await this.denunciaService.eliminar(denuncia.id);
    
    console.log("this: ", response);
    
    if (response) {
      const toast = await this.toastController.create({
        message: 'Denuncia eliminada correctamente',
        duration: 2000
      });
      await toast.present();
      this.obtenerDenuncias();
    }
  }

}
