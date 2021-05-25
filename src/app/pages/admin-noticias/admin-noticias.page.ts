import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { CameraService } from 'src/app/services/camera.service';
import { StorageService } from 'src/app/services/storage.service';

import { Subscription } from 'rxjs';
import { NoticiaService } from 'src/app/services/noticia.service';

declare var window: any;
@Component({
  selector: 'app-admin-noticias',
  templateUrl: './admin-noticias.page.html',
  styleUrls: ['./admin-noticias.page.scss'],
})
export class AdminNoticiasPage implements OnInit {

  imagenes: any[]=[];
  tempImages: string[] = [];

  user;
  noticias;
  noticiasForm: FormGroup;


  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private storageService: StorageService,
    private cameraService: CameraService,
    private toastController: ToastController,
    private noticiaService: NoticiaService,

  ){
      this.createForm();
  }

  async ionViewWillEnter(){
    //obtener los datos del usuario
    this.user = await this.userService.getUser();
    if (this.user) {this.noticiasForm.controls.id_user.setValue(this.user.id); }
  }


  ngOnInit() {}

  createForm() {
    console.log('createForm: asdf');
     
    this.noticiasForm = this.formBuilder.group({
    titulo_noticia: ['', Validators.required],
    descripcion_noticia: ['', Validators.required],
    estado : [0, Validators.required],
    id_user : ['', Validators.required],

    });
  }

  async onSubmit() {
    
    // formulario -> servicio -> api/controlador

    // datos del formulario
    const data = {...this.noticiasForm.value};
    // se agrega el atributo imagenes con las imagenes a enviar
    data['imagenes'] = this.imagenes;
    
    // enviar datos del formulario al servicio
    console.log(data);
    
    const respuesta: any = await this.noticiaService.noticias(data);

    if (respuesta.success) {
      const toast = await this.toastController.create({
        message: 'Noticia enviada correctamente',
        duration: 2000
    });

      this.imagenes = [];
      this.tempImages = [];
      // this.noticiasForm.reset();

      await toast.present();

      // this.router.navigate(['/']);
    }   
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
    console.log('noticia');
    
  }

  onDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
