import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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
  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) { 

    this.inicializarFormulario();
    this.activeRoute.queryParams.subscribe(params => {
      console.log(params);
      if (params.usuario) {
        this.idUsuario = params.usuario;
      }
    });
  }

  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
    console.log('user: ', this.user);
    this.obtenerUsuarios();
   }
   
  ngOnInit() {
  }

  async obtenerUsuarios() {
    
    const response: any = await this.userService.obtenerId(this.idUsuario);
    console.log(this.idUsuario);
    
    //console.log('response: ', response);
    
    if (response.success) {
      console.log("data:",typeof response.data);
      
      this.usuario = response.data;
      if (this.user && this.user.id != 1) {
        this.cargarFormulario();
      }
      console.log('despues peticion: ', this.usuario);
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

    console.log(this.formulario);
    
  }


  async actualizar() {
    const data = this.formulario.value;

    const response: any = await this.userService.actualizar(data);
  
      if (response.success) {
        const toast = await this.toastController.create({
          message: 'Usuario confirmado correctamente',
          duration: 2000
        });
        
      }
    
    this.router.navigate(['/tabs/detalle-usuario']);
  
  }


  async confirmarActualizacion() {
    // petición PUT para actualizar el estado de la denuncia
    this.usuario.estado = 1;
    console.log('antes de actualizar estado: ', this.usuario);
    const response: any = await this.userService.actualizar(this.usuario);
    if (response.ok) {
      const toast = await this.toastController.create({
        message: 'Usuario confirmado correctamente',
        duration: 2000
      });
    }
  }

  async confirmar() {
    const alert = this.alertController.create({
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

  }

}
