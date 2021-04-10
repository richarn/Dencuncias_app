import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { CameraService } from 'src/app/services/camera.service';
import { StorageService } from 'src/app/services/storage.service';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { LocationService } from 'src/app/services/location.service';
import { Subscription } from 'rxjs';

declare var window: any;
@Component({
  selector: 'app-denuncias',
  templateUrl: 'denuncias.page.html',
  styleUrls: ['denuncias.page.scss']
})
export class DenunciasPage {


  cargandoGeo = false;

  tempImages: string[] = [];
  imagenes: any[] = [];

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
    private storageService: StorageService,
    private denunciaService: DenunciaService,
    private cameraService: CameraService,
    private toastController: ToastController,
    private locationService: LocationService
  ) {
    this.createForm();
  }

  async ionViewWillEnter() {
    // obtener datos del usuario desde el servicio y asignar al formulario
    this.user = await this.userService.user();
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

  async ngOnInit() { }

  createForm() {
    console.log('createForm');
    
    this.denunciaForm = this.formBuilder.group({
      descripcion_denuncia: ['', Validators.required],
      estado : [0, Validators.required],
      ubicacion : ['', Validators.required],
      id_user : ['', Validators.required],
    });
  }

  async onSubmit() {
    
    // formulario -> servicio -> api/controlador

    // datos del formulario
    const data = {...this.denunciaForm.value};
    // se agregar el atributo imagenes con las imagenes a enviar
    data['imagenes'] = this.imagenes;
    
    // enviar datos del formulario al servicio
    const respuesta: any = await this.denunciaService.denuncias(data);

    if (respuesta.success) {
      const toast = await this.toastController.create({
        message: 'Denuncia enviada correctamente',
        duration: 2000
      });

      this.imagenes = [];
      this.tempImages = [];
      this.denunciaForm.reset();

      await toast.present();

      this.router.navigate(['/']);
    }
  }  


  getGeo() {
    if (!this.ubicacion.posicion ) {
      this.ubicacion.coords = null;
      return;
    }
    
    this.cargandoGeo = true;

    this.locationService.requestPermissions();
  }

  // seccion camara

  async camara() {
    const imageData = await this.cameraService.abrirCamara();
    this.procesarImagen(imageData);
  }

  async libreria() {
    const imageData = await this.cameraService.abrirGaleria();
    this.procesarImagen(imageData);
  }

  async procesarImagen(imageData) {
    
    const img = window.Ionic.WebView.convertFileSrc( imageData );
    // Muestra la/s imagen/es
    this.tempImages.push(img);

    // obtiene la imagen
    const response = await fetch(img);
    // convierte a blob para enviar a la api
    const blob = await response.blob();
    this.imagenes.push(blob);
    console.log('denuncias');
    
  }

  onDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
