import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { CameraService } from 'src/app/services/camera.service';
import { StorageService } from 'src/app/services/storage.service';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { LocationService } from 'src/app/services/location.service';
import { GeneralService } from 'src/app/services/general.service';
import { BarrioService } from 'src/app/services/barrio.service';

import { Subscription } from 'rxjs';

declare var window: any;
@Component({
  selector: 'app-denuncias',
  templateUrl: 'denuncias.page.html',
  styleUrls: ['denuncias.page.scss']
})
export class DenunciasPage {


  cargandoGeo = false;

  barrios: any[] = [];
  imagenes: any[] = [];
  previewImages: any[] = [];

  ubicacion = { 
    coords: null,
    posicion: false
  };

  user;
  denuncia;
  denunciaForm: FormGroup;

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private denunciaService: DenunciaService,
    private generalService: GeneralService,
    private barrioService: BarrioService,
    private toastController: ToastController,
    private locationService: LocationService
  ) {
    this.createForm();
    this.obtenerBarrios();
    // Si la url tiene id se obtiene obtiene la denuncia para actualizar
    // this.activeRoute.queryParams.subscribe(params => {
      // if (params.denuncia) {
        // this.idDenuncia = params.denuncia;
        // this.obtenerDenuncia();
      // }
    // });
  }

  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.getUser();
    console.log('user: ', this.user);
    
    if (this.user) { this.denunciaForm.controls.id_user.setValue(this.user.id); }

    // Espera las coordenadas enviadas desde el servicio
    const location = this.locationService.coordinates
    .subscribe(coordenadas => {
      if (coordenadas) {
        // asignar lat;lng al formulario
        this.denunciaForm.controls.ubicacion.setValue(`${coordenadas.latitude};${coordenadas.longitude}`);
      }
      this.cargandoGeo = false;
    });

    this.subscriptions.push(location);
  }

  async ngOnInit() {
    const removeImage = this.generalService.removeImage
    .subscribe(index => {
      if (this.imagenes[index]) this.imagenes.splice(index, 1);
    });

    this.subscriptions.push(removeImage)
  }

  createForm() {
    this.denunciaForm = this.formBuilder.group({
      id: [''],
      id_barrio: ['', Validators.required],
      descripcion_denuncia: ['', Validators.required],
      estado : [0, Validators.required],
      ubicacion : ['', Validators.required],
      id_user : ['', Validators.required],
    });
  }

  async obtenerBarrios() {
    const response: any = await this.barrioService.barrios();
    if (response.success) {
      this.barrios = response.barrios;
      console.log(this.barrios);
      
    }
  }

  async obtenerDenuncia() {
    // obtener denuncia y rellenar formulario
    // servicio.obtenerId(idDenuncia)
    // this.denuncia = response.body
    // recorre por las keys del formulario y asigna los datos
    for (let key in this.denuncia) {
      if (this.denunciaForm.value[key]) {
        this.denunciaForm.controls[key].setValue(this.denuncia[key])
      }
    }
  }

  onSubmit() {  
    if (this.denunciaForm.value.id) this.actualizarDenuncia();
    else this.crearDenuncia();
  }

  async crearDenuncia() {
    // formulario -> servicio -> api/controlador

    // datos del formulario
    const data = {...this.denunciaForm.value};
    // se agregar el atributo imagenes con las imagenes a enviar
    data['imagenes'] = this.imagenes;
    
    // enviar datos del formulario al servicio
    const respuesta: any = await this.denunciaService.registrar(data);

    if (respuesta.success) {
      const toast = await this.toastController.create({
        message: 'Denuncia enviada correctamente',
        duration: 2000
      });

      // this.denuncia = respuesta.data;

      // await this.generalService.createQueue(this.imagenes, this.subirImagen.bind(this))

      this.imagenes = [];
      this.ubicacion.posicion = false;
      this.generalService.limpiarImagenes.emit();
      this.denunciaForm.reset();

      await toast.present();
      this.createForm();
      this.router.navigate(['/']);
    }
  }

  imagenesSeleccionadas(event) {
    this.imagenes = event.imagenes;
    this.previewImages = event.preview;
  }

  // async subirImagen(blob: Blob) {
  //   const response: any = await this.denunciaService.uploadImage(this.denuncia.id, blob);
  //   if (response.success) {
  //     console.log('imagen subida')
  //   }
  // }

  async actualizarDenuncia() {
    const data = {...this.denunciaForm.value};
    // se agregar el atributo imagenes con las imagenes a enviar
    data['imagenes'] = this.imagenes;
    
    // enviar datos del formulario al servicio
    const respuesta: any = await this.denunciaService.actualizar(data);

    if (respuesta.success) {
      const toast = await this.toastController.create({
        message: 'Denuncia actualizada correctamente',
        duration: 2000
      });

      // this.denuncia = respuesta.data;
      // await this.generalService.createQueue(this.imagenes, this.subirImagen.bind(this))

      this.imagenes = [];
      this.ubicacion.posicion = false;
      this.generalService.limpiarImagenes.emit();
      this.denunciaForm.reset();

      await toast.present();

      this.router.navigate(['/']);
    }
  }


  getGeo() {
    console.log('ubicacion: ', this.ubicacion);
    
    if (!this.ubicacion.posicion ) {
      this.ubicacion.coords = null;
      return;
    }
    
    this.cargandoGeo = true;

    this.locationService.requestPermissions();
  }

  onDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
