import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { UserService } from 'src/app/services/user.service';


declare var window: any;

@Component({
  selector: 'app-detalle-denuncia',
  templateUrl: './detalle-denuncia.page.html',
  styleUrls: ['./detalle-denuncia.page.scss'],
})
export class DetalleDenunciaPage implements OnInit {

  imagenes: any[] = [];
  
  user;
  idDenuncia;
  denuncia;
  imagenesPrevias = [];
  imagenesSolucion = [];
  formulario: FormGroup;

  constructor(
    private router: Router,
    private denunciasService: DenunciaService,
    private alertController: AlertController,
    private toastController: ToastController,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.inicializarFormulario();
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
    console.log('user: ', this.user);
    this.obtenerDenuncias();
   }

  ngOnInit() {
  }

  async obtenerDenuncias() {
    
    const response: any = await this.denunciasService.obtenerId(this.idDenuncia);
    console.log(this.idDenuncia);
    
    //console.log('response: ', response);
    
    if (response.success) {
      console.log("data:",typeof response.data);
      
      this.denuncia = response.data;
      this.imagenesPrevias = this.denuncia.imagenes;
      this.imagenesSolucion = this.denuncia.imagenesSolucionadas;

      this.imagenesPrevias = this.denuncia.imagenes.filter(imagen => imagen.estado == 1);
      this.imagenesSolucion = this.denuncia.imagenes.filter(imagen => imagen.estado == 2);
      if (this.user && this.user.id == this.denuncia.id_user) {
        this.cargarFormulario();
      }
      console.log('despues peticion: ', this.denuncia);
    }
  }

  inicializarFormulario() {
    this.formulario = this.formBuilder.group({
      id: ['', Validators.required],
      id_barrio: ['', Validators.required],
      descripcion_denuncia: ['', Validators.required],
      descripcion_solucion : ['', Validators.required],
      estado : [0, Validators.required],
      ubicacion : ['', Validators.required],
      id_user : ['', Validators.required]
      // completar campos
    })
  }

  cargarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [this.denuncia.id, Validators.required],
      descripcion_denuncia: [this.denuncia.descripcion_denuncia, Validators.required],
      descripcion_solucion : [this.denuncia.descripcion_solucion, Validators.required],
      estado : [this.denuncia.estado, Validators.required],
      ubicacion : [this.denuncia.ubicacion, Validators.required],
      id_barrio : [this.denuncia.id_barrio, Validators.required],
      id_user : [this.denuncia.id_user, Validators.required]
      // completar campos
    })

    console.log(this.formulario);
    
  }

  imagenesSeleccionadas(imagenes) {
    this.imagenes = imagenes;
    console.log('imagenes', imagenes);
    
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
    this.denuncia['imagenes'] = this.imagenes;
    console.log('antes de actualizar estado: ', this.denuncia);
    const response: any = await this.denunciasService.actualizar(this.denuncia);
    if (response.ok) {
      const toast = await this.toastController.create({
        message: 'Denuncia confirmada correctamente',
        duration: 2000
      });
    }
  }

  // seccion camara

  

  async actualizar() {
    const data = this.formulario.value;
    data['imagenes'] = this.imagenes;
    const response: any = await this.denunciasService.actualizar(data);
  
      if (response.success) {
        const toast = await this.toastController.create({
          message: 'Denuncia enviada correctamente',
          duration: 2000
        });
        
      }
    
    this.router.navigate(['/user-denuncias']);
  }

  async confirmarEliminacion(imagen) {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      subHeader: '¿Estas seguro de eliminar la imagen?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Aceptar',
          handler: () => this.eliminar(imagen)
        }
      ]
    })

    return await alert.present();
  }

  async eliminar(imagen) {
    const response: any = await this.denunciasService.eliminarImagen(this.denuncia.id, imagen.id);

    if (response.ok) {
      const index = this.denuncia.imagenes.findIndex(fimage => fimage.id == imagen.id);
      if (index > -1) this.denuncia.imagenes.splice(index, 1);
    }

    this.toastController.create({
      message: response.body.message
    })
  }

}
