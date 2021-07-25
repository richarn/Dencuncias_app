import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.page.html',
  styleUrls: ['./admin-user.page.scss'],
})
export class AdminUserPage implements OnInit {
  user;
  usuario;
  idUsuario;
  usuarios: any[] = [];
  infScrollDisabled = false;

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

    this.obtenerUsuario();
  }

  
  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
    this.obtenerUsuario();
  }
  
  ngOnInit() {
    this.obtenerUsuario();
  }

  async obtenerUsuario(event?) {
    const response: any = await this.userService.GetUser();
    if (response.success) {
      this.usuarios = response.usuarios;

      if (response.usuarios.length == 0) this.infScrollDisabled = true;
    }

    if (event) {
      try { event.target.complete(); }
      catch(e) {}
    }
  }


  async confirmarEliminacion(usuario) {
    
    const alert = this.alertController.create({
      header: 'Confirmar eliminacion',
      subHeader: '¿Estas seguro de continuar?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => this.eliminar(usuario)
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

  async eliminar(usuario) {
    
    // petición get id de denuncia para eliminar la denuncia  
    const response: any = await this.userService.eliminar(usuario.id);
    
    if (response) {
      const toast = await this.toastController.create({
        message: 'Usuario eliminado correctamente',
        duration: 2000
      });
      await toast.present();
      this.obtenerUsuario();
    }
  }

  registro() {
    this.router.navigate(['/registro']);
  }

  refresh(event) {
    this.usuarios = [];
    this.infScrollDisabled = false;
    this.obtenerUsuario(event);
  }

}
