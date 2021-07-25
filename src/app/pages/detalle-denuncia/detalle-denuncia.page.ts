import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { DenunciaService } from 'src/app/services/denuncia.service';
import { LocationService } from 'src/app/services/location.service';
import { GeneralService } from 'src/app/services/general.service';
import { BarrioService } from 'src/app/services/barrio.service';
import { UserService } from 'src/app/services/user.service';

import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-denuncia',
  templateUrl: './detalle-denuncia.page.html',
  styleUrls: ['./detalle-denuncia.page.scss'],
})
export class DetalleDenunciaPage implements OnInit {
  
  user;
  denuncia;
  idDenuncia;
  cargandoGeo = false;
  formulario: FormGroup;

  barrios = [];
  imagenes = [];
  imagenesPrevias = [];
  imagenesSolucion = [];

  ubicacion = { 
    coords: null,
    posicion: false
  };

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private denunciasService: DenunciaService,
    private alertController: AlertController,
    private toastController: ToastController,
    private locationService: LocationService,
    private generalService: GeneralService,
    private barrioService: BarrioService,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.activeRoute.queryParams.subscribe(params => {
      if (params.denuncia) {
        this.idDenuncia = params.denuncia;
      }
    });

    this.inicializarFormulario();
    this.obtenerBarrios();
  }

  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
    this.obtenerDenuncias();

    const location = this.locationService.coordinates
    .subscribe(coordenadas => {
      if (coordenadas) {
        // asignar lat;lng al formulario
        this.formulario.controls.ubicacion.setValue(`${coordenadas.latitude};${coordenadas.longitude}`);
      }

      this.cargandoGeo = false;
    });

    this.subscriptions.push(location);
   }

  ngOnInit() {
  }

  async obtenerDenuncias() {
    this.generalService.showLoading('Cargando...');
    const response: any = await this.denunciasService.obtenerId(this.idDenuncia);
    if (response.success) {
      
      this.denuncia = response.data;

      this.imagenesPrevias = this.denuncia.imagenes.filter(imagen => imagen.estado == 0 || imagen.estado == 1);
      this.imagenesSolucion = this.denuncia.imagenes.filter(imagen => imagen.estado == 2);

      this.imagenesPrevias = this.imagenesPrevias.map(imagen => `${environment.host}${imagen.url}`) || [];
      this.imagenesSolucion = this.imagenesSolucion.map(imagen => `${environment.host}${imagen.url}`) || [];

      if (this.user && this.user.id == this.denuncia.id_user) {
        this.cargarFormulario();
      }
    }

    this.generalService.hideLoading();
  }

  async obtenerBarrios() {
    const response: any = await this.barrioService.barrios();
    if (response.success) {
      this.barrios = response.barrios;
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
    })
  }

  imagenesSeleccionadas(imagenes) {
    this.imagenes = imagenes;
  }

  getGeo() {
    if (!this.ubicacion.posicion ) {
      this.ubicacion.coords = null;
      return;
    }
    
    this.cargandoGeo = true;
    this.locationService.requestPermissions();
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
    const response: any = await this.denunciasService.actualizar(this.denuncia);
    if (response.ok) {
      const toast = await this.toastController.create({
        message: 'Denuncia confirmada correctamente',
        duration: 2000
      });

      await toast.present();
    }
  }

  async actualizar() {
    const data = this.formulario.value;
    data['imagenes'] = this.imagenes;
    const response: any = await this.denunciasService.actualizar(data);
  
      if (response.success) {
        const toast = await this.toastController.create({
          message: 'Denuncia enviada correctamente',
          duration: 2000
        });
        
        await toast.present();
      }
    
    this.router.navigate(['/tabs/user-denuncias']);
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

    const toast = await this.toastController.create({
      message: response.body.message
    })

    await toast.present();
  }

  onDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
