import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BarrioService } from 'src/app/services/barrio.service';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.page.html',
  styleUrls: ['./detalle-usuario.page.scss'],
})
export class DetalleUsuarioPage implements OnInit {

  user;
  formulario: FormGroup;
  usuario;
  idUsuario;
  barrios: any[] = [];
  roles: any[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private activeRoute: ActivatedRoute,
    private barrioService: BarrioService,
    private roleService: RolesService,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) { 
    this.activeRoute.queryParams.subscribe(params => {
      if (params.usuario) {
        this.idUsuario = params.usuario;
      }
    });

    this.inicializarFormulario();
    this.obtenerBarrios();
    this.obtenerRoles();
  }

  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
    this.obtenerUsuarios();
   }
   
  ngOnInit() {
  }

  async obtenerUsuarios() {
    
    const response: any = await this.userService.obtenerId(this.idUsuario);
    this.usuario = response.usuarios;

    this.cargarFormulario();
  }

  async obtenerBarrios() {
    const response: any = await this.barrioService.barrios();
    if (response.success) {
      this.barrios = response.barrios;
    }
  }

  async obtenerRoles() {
    const response: any = await this.roleService.roles();

    if (response.success) {
      this.roles = response.roles;
    }
  }

  inicializarFormulario() {
    this.formulario = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password : ['', Validators.required],
      ci : ['', Validators.required],
      telefono : ['', Validators.required],
      id_barrio : ['', Validators.required],
      id_role : ['', Validators.required],
      estado : ['', Validators.required]
    })
  }

  cargarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [this.usuario.id, Validators.required],
      name: [this.usuario.name, Validators.required],
      email : [this.usuario.email, Validators.required],
      password : [this.usuario.password, Validators.required],
      ci : [this.usuario.ci, Validators.required],
      telefono : [this.usuario.telefono, Validators.required],
      id_barrio : [this.usuario.id_barrio, Validators.required],
      id_role : [this.usuario.id_role, Validators.required],
      estado : [this.usuario.estado, Validators.required]
    })
  }


  async actualizar() {
    const data = this.formulario.value;

    const response: any = await this.userService.actualizar(data);
  
      if (response.success) {
        const toast = await this.toastController.create({
          message: 'Usuario confirmado correctamente',
          duration: 2000
        });
        
        await toast.present();
      }
    
    this.router.navigate(['/tabs/detalle-usuario']);

    if (response.success) {
      const toast = await this.toastController.create({
        message: 'Denuncia enviada correctamente',
        duration: 2000
      });

      // this.denuncia = respuesta.data;

      // await this.generalService.createQueue(this.imagenes, this.subirImagen.bind(this))

      await toast.present();
      this.router.navigate(['/tabs/admin-user']);
    }
  
  }


  async confirmarActualizacion() {
    // petición PUT para actualizar el estado de la denuncia
    this.usuario.estado = 1;
    const response: any = await this.userService.actualizar(this.usuario);
    if (response.ok) {
      const toast = await this.toastController.create({
        message: 'Usuario confirmado correctamente',
        duration: 2000
      });

      await toast.present();
    }
  }

  async confirmar() {
    const alert = await this.alertController.create({
      header: 'Confirmar usuario',
      subHeader: '¿Estas seguro de continuar?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => this.confirmarActualizacion()
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        }
      ]
    })

    return await alert.present();
  }

}
