import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { GeneralService } from 'src/app/services/general.service';
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
    private alertController: AlertController,
    private generalService: GeneralService,
    private barrioService: BarrioService,
    private activeRoute: ActivatedRoute,
    private roleService: RolesService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
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
      ci : ['', Validators.required],
      telefono : ['', Validators.required],
      id_barrio : ['', Validators.required],
      id_role : ['', Validators.required],
      estado : ['']
    })
  }

  cargarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [this.usuario.id, Validators.required],
      name: [this.usuario.name, Validators.required],
      email : [this.usuario.email, Validators.required],
      ci : [this.usuario.ci, Validators.required],
      telefono : [this.usuario.telefono, Validators.required],
      id_barrio : [this.usuario.id_barrio, Validators.required],
      id_role : [this.usuario.id_role, Validators.required],
      estado : [this.usuario.estado]
    })
  }


  async actualizar() {
    const data = this.formulario.value;

    const response: any = await this.userService.actualizar(data);
  
    if (response.success) {
      this.generalService.mostrarMensaje('Usuario confirmado correctamente');
    }
    
    this.router.navigate(['/tabs/detalle-usuario']);

    if (response.success) {
      this.generalService.mostrarMensaje('Usuario actualizado correctamente');

      // this.denuncia = respuesta.data;

      // await this.generalService.createQueue(this.imagenes, this.subirImagen.bind(this))
      this.router.navigate(['/tabs/admin-user']);
    }
  
  }


  async confirmarActualizacion() {
    // petición PUT para actualizar el estado de la denuncia
    this.usuario.estado = 1;
    const response: any = await this.userService.actualizar(this.usuario);
    if (response.ok) {
      this.generalService.mostrarMensaje('Usuario confirmado correctamente');
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
