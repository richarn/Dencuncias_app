import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
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
  imagenesSinSubir = [];

  ubicacion = { 
    coords: null,
    posicion: false
  };

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private denunciasService: DenunciaService,
    private alertController: AlertController,
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

    const removeImage = this.generalService.removeImage
    .subscribe(({ index, type }) => {
      if (this.imagenes[index]) this.imagenes.splice(index, 1);
      if (type == 1 && this.imagenesPrevias[index]) this.imagenesPrevias.splice(index, 1);
      if (type == 0 && this.imagenesSinSubir[index]) this.imagenesSinSubir.splice(index, 1);
    });

    this.subscriptions.push(removeImage);
    this.subscriptions.push(location);
   }

  ngOnInit() {
  }
  //denuncias
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
      ubicacion : [this.denuncia.ubicacion],
      id_barrio : [this.denuncia.id_barrio, Validators.required],
      id_user : [this.denuncia.id_user, Validators.required]
    }, {
      validators: [
        // campo a estar pendiente de cambios, condición, valor a cumplir, campo a asignar la validación
        this.requiredValidator('estado', '==', 2, 'descripcion_solucion')
      ]
    })
  }

  requiredValidator(masterControlLabel: string, operator: string, conditionalValue: any, slaveControlLabel: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const masterControl = group.controls[masterControlLabel];
      const slaveControl = group.controls[slaveControlLabel];
      if (eval(`'${masterControl.value}' ${operator} '${conditionalValue}'`) || !masterControl.value) {
        return Validators.required(slaveControl);
        // switch (type) {
          // case 'required':
          //   return Validators.required(slaveControl);
        
          // case 'isEmail':
          //   return Validators.email(slaveControl);

          // case 'minLength':
          //   return Validators.minLength(10);
          //   break;
        // }
      }
      slaveControl.setErrors(null);
      return null;
    };
  }

  imagenesSeleccionadas({ imagenes, preview }) {
    this.imagenes.push(...imagenes);
    this.imagenesSinSubir.push(...preview);
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
    this.generalService.showLoading('Confirmando...');

    // petición PUT para actualizar el estado de la denuncia
    this.denuncia.estado = 1;
    this.denuncia['imagenes'] = this.imagenes;
    const response: any = await this.denunciasService.actualizar(this.denuncia);
    if (response.ok) {
      this.generalService.mostrarMensaje('Denuncia confirmada correctamente');
    } else this.generalService.mostrarMensaje('Ha ocurrido un problema, por favor intentelo más tarde');

    this.generalService.hideLoading();
  }

  async actualizar() {
    this.generalService.showLoading('Actualizando...');

    const data = this.formulario.value;
    data['imagenes'] = this.imagenes;
    const response: any = await this.denunciasService.actualizar(data);
  
    if (response.success) {
      this.imagenesSinSubir = [];
      this.generalService.limpiarImagenes.emit();
      this.generalService.mostrarMensaje('Denuncia actualizada correctamente');
    } else this.generalService.mostrarMensaje('Ha ocurrido un problema, por favor intentelo más tarde');

    this.generalService.hideLoading();
    if (this.user && this.user.role && this.user.role.nivel != 1) this.router.navigate(['/tabs/user-denuncias']);
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

    this.generalService.showLoading(response.body.message);
  }

  onDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
